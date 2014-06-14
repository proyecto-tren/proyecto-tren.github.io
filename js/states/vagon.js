var numDeMoscas = 10;
var moscasMuertas;
var numDeMosquitas = 3;
var moscas = [];
var mosquitas = [];
var scoreText;
var minimosca;

States.VagonState = function(game){};

States.VagonState.prototype = {
    
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
                    minimosca.kill();
                    mosquitas.forEach(function(mosquita) {
                        mosquita.kill(); 
                    });
                }
            });
            moscas.push(mosca);
        }
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
        
        //Creamos a Emilio
        this.emilio = new Emilio(this, 'emilio');
        
        // Hacemos que la camara siga a Emilio a donde vaya
        this.camera.follow(this.emilio);
        
        //  The score
        scoreText = this.add.text(16, 16, 'Score: '+score, { fontSize: '32px', fill: '#000' });
        
        //this.paredIzq = new Pared(this, 'pared', -50);
        this.paredDer = new Pared(this, 'pared', 1550);
        this.piso = new Pared(this, 'pared', 0, 590);
        this.piso.angle = 90;
        this.piso.scale.setTo(1900,0);
        
        minimosca = this.game.add.sprite(50, 50, 'minimosca');
        minimosca.inputEnabled = true;
        minimosca.events.onInputDown.add(function(sprite){
            States.VagonState.prototype.createMoscas(game);
        });
        
        var camara = this.add.sprite(750, 420, 'camara');
        camara.inputEnabled = true;
        camara.events.onInputDown.add(function(sprite){
            new Video(this.game, 'images/trenlp.mp4');
            score += 50;
            scoreText.text = 'Score: ' + score;
        });
        States.VagonState.prototype.createMosquitas(game);
    },
    
    update : function(){
        this.physics.arcade.collide(this.emilio, this.paredIzq);
        this.physics.arcade.collide(this.emilio, this.paredDer);
        var isEmilioOnTheFloor = this.physics.arcade.collide(this.emilio, this.piso);
        
        //Si salió del vagón
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
    }

};

game.state.add('VagonState',States.VagonState);