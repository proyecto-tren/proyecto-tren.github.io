States.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
	this.exitButton = null;

};

States.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

//		this.music = this.add.audio('musica');
//		this.music.play("", null, 0.5, true);

 		this.add.sprite(0, 0, 'menubkgnd');

		this.playButton = this.add.button(340, 155, 'menulink', this.startGame, this);
		this.exitButton = this.add.button(340, 420, 'menulink', this.exitGame, this);
		
		clickeables.add(this.playButton, this.exitButton);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
//		this.music.stop();

		//	And start the actual game
		this.state.start(lastState);

	},
	
	exitGame: function (pointer) {
		alert("Para salir, simplemente cierra la ventana del navegador.\nALERTA: TODO TU PROGRESO SE PERDERA.");
	}

};

game.state.add('MenuState',States.MainMenu);