var numDeMoscas = 5;
var moscasMuertas;
var numDeMosquitas = 3;
var moscas = [];
var mosquitas = [];
var scoreText;
var timerText;
var minimosca;
// Variable que controla si ya vio el video de la mamadera.
var vioMamadera = false;
// Variable que controla si ya vio el video de las facturas.
var vioFacturas = false;
// Variable que controla si ya vio el video de la copa.
var vioCopa = false;
// Timer que se usara en el minijuego de moscas
var timer;
var tiempoActual;
// Cuantos segundos le damos al jugador para matar a todas las moscas.
var tiempoMinijuegoMosca = 30;
// Posadas ya le dio la lata?
var vioAnimacionPosadas = false;
var siluetas = [];
var placa;
var wall;

States.VagonState = function(game) {
};

States.VagonState.prototype = {
	createTimer : function(game, funcion) {
		timer = game.time.create(game);
		timer.add(tiempoMinijuegoMosca * 1000, funcion, this);
		// The time
		timerText = game.add.sprite(650, 10, 'numero9');
		tiempoActual = 9;
		timerText.fixedToCamera = true;
		timer.start();
	},
	
	mostrarPlaca : function(game) {
		placa = game.add.sprite(0,0,'placa');
		placa.fixedToCamera = true;
		placa.inputEnabled = true;
		placa.input.priorityID = 998;
		var flecha = game.add.sprite(0,0,'flecha');
		flecha.fixedToCamera = true;
		flecha.inputEnabled = true;
		flecha.input.priorityID = 999;
		clickeables.add(flecha);
		emilioCanMove = false;
		flecha.events.onInputDown.add(function(flecha){
			placa.destroy();
		    flecha.destroy();
		    emilioCanMove = true;
		});
	},

	createMoscas : function(game) {

		moscasMuertas = 0;
		for (var i = 1; i <= numDeMoscas; i++) {
			var moscanum = Math.floor((Math.random() * 4) + 1);
			var mosca = new MoscaVoladora(game, 'mosca' + moscanum);
			clickeables.add(mosca);
			mosca.events.onKilled.add(function(sprite) {
				score += 10;
				scoreText.text = 'Score: ' + score;
				if (++moscasMuertas == numDeMoscas) {
					mosquitas.forEach(function(mosquita) {
						mosquita.kill();
					});
					ganoMinijuegoMosca = true;
					timer.destroy();
					timer = null;
					timerText.destroy();
					alert("\xa1Has salvado el vag\xf3n!");
					wall.kill();
				}
			});
			moscas.push(mosca);
		}
	},

	enableMoscaGame : function(game) {
		minimosca = game.add.sprite(100, game.camera.y + 75, 'minimosca');
		clickeables.add(minimosca);
		minimosca.inputEnabled = true;
		minimosca.fixedToCamera = true;
		minimosca.scale.setTo(0.5,0.5);
		minimosca.events.onInputDown
				.add(function(sprite) {
					var accept = confirm("\xa1El vag\xf3n se ha llenado de moscas! Ayuda a Emilio a matarlas haciendo click sobre ellas.\n\xbfComenzar el juego?");
					if (accept) {
						var video = new Video(game,
								'videos/matamosca-comienzo.mp4');
						video
								.addEventListener(
										'end',
										function() {
											wall = new Pared(game, 'pared', 0, 0);
											wall.scale.setTo(500000000, 50000000000);
											wall.inputEnabled = true;
											States.VagonState.prototype
													.createTimer(
															game,
															function() {
																alert("Las moscas han tomado el control del vag\xf3n :(\nInt\xe9ntalo nuevamente.");
																game.state
																		.restart();
															});
											minimosca.kill();
											States.VagonState.prototype
													.createMoscas(game);
										}, false);
					}

				});
	},

	createMosquitas : function(game) {
		for (var i = 1; i <= numDeMosquitas; i++) {
			mosquitas.push(new Mosquita(game, 'mosca'
					+ Math.floor((Math.random() * 4) + 1)));
		}
	},
	
	renderSeniora : function(game) {
		var mesadebajo = game.add.sprite(700, 280, 'mesa-debajo-seniora');
		this.seniora = game.add.sprite(650, 190, 'seniora');
		this.seniora.animations.add('play');
		var mesaencima = game.add.sprite(700, 280, 'mesa-sobre-seniora');
		clickeables.add(this.seniora);
		this.seniora.animations.play('play',7, true);
		this.seniora.events.onInputDown.add(function(seniora) {
			States.VagonState.prototype.mostrarPlaca(game);
		});
	},
	
	renderPy : function(game) {
		var mesadebajo = game.add.sprite(245, 300, 'mesa-debajo-py');
		this.py = game.add.sprite(210, 160, 'py');
		this.py.animations.add('play',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,14,5,4,3,2,1,0], 10, false);
		var mesaencima = game.add.sprite(235, 300, 'mesa-sobre-py');
		this.py.saludo = game.add.audio('saludo-py');
		this.py.inputEnabled = true;
		clickeables.add(this.py);
		this.py.events.onInputDown.add(function(py) {
			py.animations.play('play');
			py.saludo.play("", null, 1, false);
		});
		
		
	},
	
	renderPosadas : function(game) {
		game.posadas = game.add.sprite(1415, 160, 'posadas');
		game.posadas.animations.add('terminar',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,
		                                      19,20,21,22,23,24,25,26,27,28,29,30,31,10,9,8,7,6,
		                                      5,4,3,2,1,0], 10, false);
		game.posadas.animations.add('noterminar',[0,1,0,1,0],5,false);
		game.audiowin = game.add.audio('posadaswin');
		
		game.posadas.estaCercaDe = function(sprite){
			var distancia = (game.posadas.x - sprite.x);
			return ((distancia > -5) && (distancia < 5));
		}
	},

	renderVideoObjects : function(game) {
		// Creamos la mamadera con el video
		var mamadera = game.add.sprite(750, 243, 'mamadera');
		mamadera.inputEnabled = true;
		mamadera.events.onInputDown.add(function(sprite) {
			new Video(game, 'videos/mamadera.mp4');
			if (!vioMamadera) {
				vioMamadera = true;
				score += 50;
				scoreText.text = 'Puntaje: ' + score;
				if ((minimosca == null) && (score == 100)
						&& (!ganoMinijuegoMosca))
					States.VagonState.prototype.enableMoscaGame(game);
			}

		});

		// Creamos el facturas con el video
		var facturas = game.add.sprite(2050, 235, 'facturas');
		facturas.inputEnabled = true;
		facturas.events.onInputDown.add(function(sprite) {
			new Video(game, 'videos/facturas.mp4');
			if (!vioFacturas) {
				vioFacturas = true;
				score += 50;
				scoreText.text = 'Puntaje: ' + score;
				if ((minimosca == null) && (score == 100)
						&& (!ganoMinijuegoMosca))
					States.VagonState.prototype.enableMoscaGame(game);
			}

		});

		// Creamos el facturas con el video
		var copa = game.add.sprite(370, 275, 'copa');
		copa.inputEnabled = true;
		copa.events.onInputDown.add(function(sprite) {
			new Video(game, 'videos/copa.mp4');
			if (!vioCopa) {
				vioCopa = true;
				score += 50;
				scoreText.text = 'Puntaje: ' + score;
				if ((minimosca == null) && (score == 100)
						&& (!ganoMinijuegoMosca))
					States.VagonState.prototype.enableMoscaGame(game);
			}

		});
		var x = 810;
		var y = 175;
		var scale = -1;

		for (var i = 1; i <= 4; i++) {
			siluetas[i] = game.add.sprite(x, y, 'silueta');
			siluetas[i].scale.x = scale;
			siluetas[i].inputEnabled = true;
			siluetas[i].visto = false;
			siluetas[i].index = i;
			siluetas[i].events.onInputDown.add(function(sprite) {
				new Video(this.game, 'videos/silueta' + sprite.index + '.mp4');
				if (!sprite.visto) {
					sprite.visto = true;
					score += 50;
					scoreText.text = 'Puntaje: ' + score;
					if ((minimosca == null) && (score == 100)
							&& (!ganoMinijuegoMosca))
						States.VagonState.prototype.enableMoscaGame(game);
				}

			});
			clickeables.add(siluetas[i]);
			if (i == 2) {
				x = 1575;
				y = 255;
			} else {
				x += 20;
			}
			scale *= -1;
		}

		clickeables.add(mamadera, facturas, copa);
	},

	preload : function() {

	},

	create : function() {
		emilioCanMove = true;
		
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.world.setBounds(0, 0, 2440, 600);

		this.vagon = game.add.sprite(0, 0, 'vagon');

		// Our controls.
		this.cursors = this.input.keyboard.createCursorKeys();
		
		States.VagonState.prototype.renderSeniora(this.game);
		
		States.VagonState.prototype.renderPy(this.game);

		States.VagonState.prototype.renderVideoObjects(this.game);
		
		States.VagonState.prototype.renderPosadas(this.game);

		// Creamos a Emilio
		this.emilio = new Emilio(this.game, 2300);

		// Hacemos que la camara siga a Emilio a donde vaya
		this.camera.follow(this.emilio);

		// this.paredIzq = new Pared(this, 'pared', -50);
		this.paredDer = new Pared(this, 'pared', 10);
		this.piso = new Pared(this, 'pared', 0, 590);
		this.piso.angle = 90;
		this.piso.scale.setTo(2500, 0);

		States.VagonState.prototype.createMosquitas(game);
		// The score
		scoreText = this.add.text(16, 16, 'Puntaje: ' + score, {
			fontSize : '32px',
			fill : '#000'
		});
		scoreText.fixedToCamera = true;

		if ((score >= 100) && (!ganoMinijuegoMosca))
			States.VagonState.prototype.enableMoscaGame(game);
		
		__load_layout();
	},

	update : function() {
		this.physics.arcade.collide(this.emilio, this.paredIzq);
		this.physics.arcade.collide(this.emilio, this.paredDer);
		var isEmilioOnTheFloor = this.physics.arcade.collide(this.emilio,
				this.piso);

		// Si salio del vagon
		if (this.emilio.x > 2300) {
			transitions.to('AndenState');
		}
		
		if (isEmilioOnTheFloor && emilioCanMove) {
			if (this.cursors.up.isDown || keyboard.isUpPressed()) {
				this.emilio.jump();
			} else if (this.cursors.right.isDown || keyboard.isRightPressed()) {
				// Move to the right
				this.emilio.moveRight();
			} else if (this.cursors.left.isDown || keyboard.isLeftPressed()) {
				// Move to the left
				this.emilio.moveLeft();
			} else {
				this.emilio.stand();
			}
		}

		moscas.forEach(function(mosca) {
			if (mosca.position.x < 35) {
				mosca.scale.x = 1;
			}
			if (mosca.position.x > 2415) {
				mosca.scale.x = -1;
			}
		});

		mosquitas.forEach(function(mosca) {
			if (mosca.position.x < 35) {
				mosca.scale.x = 1;
			}
			if (mosca.position.x > 2415) {
				mosca.scale.x = -1;
			}
		}, this, false);

		if (timer != null) {
			var tiempo = Math.floor((tiempoMinijuegoMosca - timer.seconds) / 3);
			if ((tiempo < tiempoActual) && (tiempo >= 0)) {
				timerText.loadTexture('numero' + tiempo);
			}

		};
		
		if (game.posadas.estaCercaDe(this.emilio) && !vioAnimacionPosadas){
			if(ganoMinijuegoMosca){
				vioAnimacionPosadas  = true;
				emilioCanMove = false;
				this.emilio.loadTexture('emilioEspaldas');
				this.emilio.stand();
				game.posadas.animations.play('terminar');
				game.audiowin.play();
				game.posadas.events.onAnimationComplete.add(function(){
					addCollectable('lata');
					showHeader();
					emilioCanMove = true;
					this.emilio.reloadAnimations();
				}, this);
			}else{
				game.posadas.animations.play('noterminar');
			}
		}
	},
	render: function() {
    	//game.debug.inputInfo(16, 16);
	}

};

game.state.add('VagonState', States.VagonState);
