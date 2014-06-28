var numDeMoscas = 5;
var moscasMuertas
var moscasMuertas;
var numDeMosquitas = 3;
var moscas = [];
var mosquitas = [];
var scoreText;
var timerText;
var minimosca;
//Variable que controla si ya vio el video de la mamadera.
var vioMamadera = false;
//Variable que controla si ya vio el video del cenicero.
var vioCenicero = false;
//Variable que controla si ya vio el video de la copa.
var vioCopa = false;
//Timer que se usara en el minijuego de moscas
var timer;
//Cuantos segundos le damos al jugador para matar a todas las moscas.
var tiempoMinijuegoMosca = 30;

States.VagonState = function(game){
};

States.VagonState.prototype = {
	createTimer: function(game, funcion){
		timer = game.time.create(game);
		timer.add(tiempoMinijuegoMosca * 1000,funcion,this);
	//  The time
        timerText = game.add.text(16, 50, 'Tiempo: '+Math.ceil(tiempoMinijuegoMosca - timer.seconds), { fontSize: '32px', fill: '#000' });
        timerText.fixedToCamera = true;
		timer.start();
	},
	
    createMoscas: function(game){
    	
        moscasMuertas = 0;
        for (var i = 1; i <= numDeMoscas; i++)
        {
            var moscanum = Math.floor((Math.random()*4)+1);
            var mosca = new MoscaVoladora(game, 'mosca' + moscanum);
            mosca.events.onKilled.add(function(sprite){
                score += 10;
                scoreText.text = 'Score: ' + score;
                if (++moscasMuertas == numDeMoscas){
                    mosquitas.forEach(function(mosquita) {
                        mosquita.kill(); 
                    });
                    ganoMinijuegoMosca = true;
                    timer.destroy();
                    timer = null;
            		timerText.text = '';
                    alert("¡Has salvado el vagón!");
                }
            });
            moscas.push(mosca);
        }
    },
    
    enableMoscaGame: function(game) {
    	minimosca = game.add.sprite(100, game.camera.y + 75, 'minimosca');
        minimosca.inputEnabled = true;
        minimosca.fixedToCamera = true;
        minimosca.events.onInputDown.add(function(sprite){
        	var accept = confirm("¡El vagón se ha llenado de moscas! Ayuda a Emilio a matarlas haciendo click sobre ellas.\n¿Comenzar el juego?");
        	if (accept){
        		States.VagonState.prototype.createTimer(game,function(){
    				alert("Las moscas han tomado el control del vagón :(\nInténtalo nuevamente.");
        			game.state.restart();	
        		});
        		minimosca.kill();
        		States.VagonState.prototype.createMoscas(game);
        	}
            
        });
	},
    
    createMosquitas: function(game){
        for (var i = 1; i <= numDeMosquitas; i++)
        {
            mosquitas.push (new Mosquita(game, 'mosca' + Math.floor((Math.random()*4)+1)));
        }
    },
    
    preload : function(){
        
    },
    
    create : function(){
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.world.setBounds(0, 0, 1600, 600);
        
        this.vagon = game.add.sprite(0, 0, 'vagon');
        
        //  Our controls.
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //Creamos la mamadera con el video
        var mamadera = this.add.sprite(530, 340, 'mamadera');
        mamadera.inputEnabled = true;
        mamadera.events.onInputDown.add(function(sprite){
            new Video(this.game, 'videos/mamadera.mp4');
            if (!vioMamadera){
            	vioMamadera = true;
            	score += 50;
                scoreText.text = 'Puntaje: ' + score;
                if ((minimosca != null) && (score == 100)) States.VagonState.prototype.enableMoscaGame(game);
            }
            
        });
        
        //Creamos el cenicero con el video
        var cenicero = this.add.sprite(1200, 370, 'cenicero');
        cenicero.inputEnabled = true;
        cenicero.events.onInputDown.add(function(sprite){
            new Video(this.game, 'videos/cenicero.mp4');
            if (!vioCenicero){
            	vioCenicero = true;
            	score += 50;
                scoreText.text = 'Puntaje: ' + score;
                if ((minimosca != null) && (score == 100) && (!ganoMinijuegoMosca)) States.VagonState.prototype.enableMoscaGame(game);
            }
            
        });
        
        //Creamos el cenicero con el video
        var copa = this.add.sprite(1100, 350, 'copa');
        copa.inputEnabled = true;
        copa.events.onInputDown.add(function(sprite){
            new Video(this.game, 'videos/copa.mp4');
            if (!vioCopa){
            	vioCopa = true;
            	score += 50;
                scoreText.text = 'Puntaje: ' + score;
                if ((minimosca == null) && (score == 100) && (!ganoMinijuegoMosca)) States.VagonState.prototype.enableMoscaGame(game);
            }
            
        });
        
        //Creamos a Emilio
        this.emilio = new Emilio(this.game);
        
        // Hacemos que la camara siga a Emilio a donde vaya
        this.camera.follow(this.emilio);
        
        //this.paredIzq = new Pared(this, 'pared', -50);
        this.paredDer = new Pared(this, 'pared', 1550);
        this.piso = new Pared(this, 'pared', 0, 590);
        this.piso.angle = 90;
        this.piso.scale.setTo(1900,0);
        
        States.VagonState.prototype.createMosquitas(game);
    //  The score
        scoreText = this.add.text(16, 16, 'Puntaje: '+score, { fontSize: '32px', fill: '#000' });
        scoreText.fixedToCamera = true;
        
        if ((score >= 100) && (!ganoMinijuegoMosca)) States.VagonState.prototype.enableMoscaGame(game);
        
    },
    
    update : function(){
        this.physics.arcade.collide(this.emilio, this.paredIzq);
        this.physics.arcade.collide(this.emilio, this.paredDer);
        var isEmilioOnTheFloor = this.physics.arcade.collide(this.emilio, this.piso);
        
        //Si salio del vagon
        if (this.emilio.x < 0){
            this.state.start('AndenState');
        }
        if(isEmilioOnTheFloor){
            if (this.cursors.up.isDown)
            {
                this.emilio.jump();
            }
            else if (this.cursors.right.isDown)
            {
                //Move to the right
                this.emilio.moveRight();
            }else if (this.cursors.left.isDown)
            {
                //Move to the left
                this.emilio.moveLeft();
            }else{
                this.emilio.stand();
            }
        }
        
        moscas.forEach(function(mosca) {
            if (mosca.position.x < 35){
                mosca.scale.x = 1;
            }
            if (mosca.position.x > 1565){
                mosca.scale.x = -1;
            } 
        });
        
        mosquitas.forEach(function(mosca) {
            if (mosca.position.x < 35){
                mosca.scale.x = 1;
            }
            if (mosca.position.x > 1565){
                mosca.scale.x = -1;
            } 
        }, this, false);
        
        if(timer != null){
        	timerText.text = 'Tiempo: ' + Math.ceil(tiempoMinijuegoMosca - timer.seconds);
        }
    }

};

game.state.add('VagonState',States.VagonState);