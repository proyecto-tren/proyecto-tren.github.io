States.EstacionState = function(game) {
	this.game = game;
};


var flecha;

function removePuzzle() {
	flecha.destroy();
	puzzleCanvas.dispatchEvent(new Event('lose'));
	document.body.removeChild(puzzleCanvas);
	//puzzleCanvas.destroy();
	puzzleCanvas = null;
	emilioCanMove = true;
}

States.EstacionState.prototype = {

	createPuzzle : function() {
		puzzleCanvas = Phaser.Canvas.create('600', '400', 'puzzleCanvas', true);
		Phaser.Canvas.addToDOM(puzzleCanvas, document.body, true);
		createPuzzle(puzzleCanvas,
				'images/rompecabezas/secuencia-caballo-con-ayuda.jpg');

		flecha = this.game.add.sprite(0, 0, 'flecha');
		flecha.inputEnabled = true;
		flecha.events.onInputDown.add(removePuzzle);

		puzzleCanvas.addEventListener("win", function() {
			removePuzzle();
			addCollectable('ticket');
			showHeader();
		}, false);

		return puzzleCanvas;
	},

	preload : function() {
	},

	create : function() {
		game.world.setBounds(0, 0, 1800, 600);
		this.estacion = this.add.sprite(0, 0, 'estacion');
		
		this.vendedor = this.add.sprite(0, 220, 'vendedor');
		this.vendedor.dialog = new Dialog(this.game, this.vendedor);
		this.vendedor.dialog.say('Hola chico!,\nPuedes ayudarme?\nAcercate.',
				true);
		this.physics.arcade.enable(this.vendedor);
		this.vendedor.body.immovable = true;
		
		this.physics.enable(this.estacion, Phaser.Physics.ARCADE);

		// Here we create the ground.
		this.floor = new Pared(this, 'pared', 0, 590);
		this.floor.angle = 90;
		this.floor.scale.setTo(1900, 0);
		this.physics.arcade.enable(this.floor);
		// Our controls.
		this.cursors = this.input.keyboard.createCursorKeys();

		this.cartel = game.add.sprite(1700, 390, 'cartel');

		this.cartel.scale.x = -1;

		// Creamos a Emilio
		this.emilio = new Emilio(this.game,1500 , 200);
		this.emilioCanMove = true;
		game.camera.follow(this.emilio);
		this.pared = new Pared(this, 'pared', 150);

		__load_layout();
	},

	update : function() {
		var isNearVendedor = this.physics.arcade.collide(this.emilio,
				this.vendedor);
		// Esta Emilio en el piso?
		var isEmilioOnTheFloor = this.physics.arcade.collide(this.emilio,
				this.floor);
		if ((this.emilio.x) > 1800) {
			transitions.to('AndenState');
		}

		if (isNearVendedor) {
			this.vendedor.frame = 0;
			this.vendedor.dialog.say(
					'Mi Zootropo\nse rompio.\nPodrias ayudarme?', true);
			emilioCanMove = false;
			var emilio = this.emilio;
			emilio.stand();
			var vendedor = this.vendedor;
			var puzzleFunction = this.createPuzzle;

			setTimeout(
					function() {
						var accept = confirm("\xbfAyudar al vendedor?");
						if (accept) {
							var puzzle = puzzleFunction();
							puzzle
									.addEventListener(
											"win",
											function() {
												vendedor.frame = 2;
												emilioCanMove = true;
												vendedor.dialog
														.say(
																'Muy bien! Gracias!\nToma esto como\nrecompensa.',
																true);
												emilio.position.x -=5;
												ganoMinijuegoPuzzle = true;
											}, false);
							puzzle.addEventListener("lose", function() {
								vendedor.frame = 1;
								emilioCanMove = true;
								emilio.position.x -=5;
								vendedor.dialog.say(
										'No puedes?\nIntentalo\nnuevamente.',
										true);
							}, false);
						} else {
							vendedor.frame = 1;
							vendedor.dialog.say('Que lastima :(\nAdios!', true);
							emilioCanMove = true;
							emilio.position.x -=5;
						}
					}, 500);

		}

		// Emilio solamente se mueve si esta en el piso.
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
		
	},
	render: function() {
    	//game.debug.inputInfo(16, 16);
	}

};

game.state.add('EstacionState', States.EstacionState);