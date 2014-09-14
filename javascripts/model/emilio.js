Emilio = function(game, x, y) {
	if (x === undefined)
		x = 100;
	if (y === undefined)
		y = 200;
	// The player and its settings
	var emilio = game.add.sprite(x, y, 'emilio');
	emilio.dialog = new Dialog(game, emilio);
	// We need to enable physics on the player
	game.physics.arcade.enable(emilio);

	// Our two animations, walking left and right.
	emilio.animations.add('left', [ 0, 1, 2, 3, 4, 5, 6 ], 10, true);
	emilio.animations.add('right', [ 8, 9, 10, 11, 12, 13, 14 ], 10,
			true);

	emilio.body.gravity.y = 500;
	emilio.body.collideWorldBounds = false;

	emilio.jump = function() {
		emilio.body.velocity.y = -250;
	};

	emilio.moveLeft = function() {
		emilio.animations.play('left');
		emilio.body.velocity.x = -400;
	};

	emilio.moveRight = function() {
		emilio.animations.play('right');
		emilio.body.velocity.x = 400;
	};

	emilio.stand = function() {
		emilio.animations.stop();
//		emilio.frame = 7; 
		emilio.body.velocity.x = 0;
	};

	emilio.say = function(contentKey) {
		emilio.dialog.say(contentKey);
	};

	emilio.shutUp = function(contentKey) {
		emilio.dialog.shutUp()
	}

	emilio.isTalking = function() {
		return emilio.dialog.isTalking()
	}

	return emilio;
};