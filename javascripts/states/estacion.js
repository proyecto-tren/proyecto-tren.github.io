States.EstacionState = function(game) {
};

var emilioCanMove = true;
var puzzleCanvas;
var flecha;

function removePuzzle() {
	flecha.destroy();
	puzzleCanvas.dispatchEvent(new Event('lose'));
	document.body.removeChild(puzzleCanvas);
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
		}, false);

		return puzzleCanvas;
	},

	preload : function() {

	},

	create : function() {
		this.office = this.add.sprite(0, 0, 'ticketOffice');
		this.vendedor = this.add.sprite(0, 250, 'vendedor');
		this.vendedor.dialog = new Dialog(this.game, this.vendedor);
		this.vendedor.dialog.say('Hola chico!,\nPuedes ayudarme?\nAcercate.',
				true);

		this.physics.enable(this.office, Phaser.Physics.ARCADE);

		// Here we create the ground.
		this.floor = this.add.sprite(0, 590, 'floor');
		this.physics.arcade.enable(this.floor);
		this.floor.scale.setTo(536, 0);
		this.floor.body.immovable = true;

		// Our controls.
		this.cursors = this.input.keyboard.createCursorKeys();

		this.cartel = game.add.sprite(700, 390, 'cartel');

		this.cartel.scale.x = -1;

		// Creamos a Emilio
		this.emilio = new Emilio(this.game, 700, 250);
		this.emilioCanMove = true;
		this.pared = new Pared(this, 'pared', 150);

		__load_layout();
	},

	update : function() {
		var isNearVendedor = this.physics.arcade.collide(this.emilio,
				this.pared);
		// Esta Emilio en el piso?
		var isEmilioOnTheFloor = this.physics.arcade.collide(this.emilio,
				this.floor);
		if ((this.emilio.x) > 800) {
			this.state.start('AndenState');
		}

		if (isNearVendedor) {
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
												emilioCanMove = true;
												vendedor.dialog
														.say(
																'Muy bien! Gracias!\nToma esto como\nrecompensa.',
																true);
											}, false);
							puzzle.addEventListener("lose", function() {
								emilioCanMove = true;
								vendedor.dialog.say(
										'/No puedes?\nIntentalo\nnuevamente.',
										true);
							}, false);
						} else {
							vendedor.dialog.say('Que lastima :(\nAdios!', true);
							emilioCanMove = true;
						}
					}, 500);

		}

		// Emilio solamente se mueve si esta en el piso.
		if (isEmilioOnTheFloor && emilioCanMove) {
			if (this.cursors.up.isDown) {
				this.emilio.jump();
			} else if (this.cursors.right.isDown) {
				// Move to the right
				this.emilio.moveRight();
			} else if (this.cursors.left.isDown) {
				// Move to the left
				this.emilio.moveLeft();
			} else {
				this.emilio.stand();
			}
		}
	}

};

game.state.add('EstacionState', States.EstacionState);