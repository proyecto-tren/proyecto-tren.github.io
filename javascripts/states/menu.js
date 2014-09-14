States.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
	this.exitButton = null;
};

States.MainMenu.prototype = {

	create: function () {

 		this.add.sprite(0, 0, 'menubkgnd');

		this.playButton = this.add.button(340, 155, 'menulink', this.startGame, this);
		this.mapButton = this.add.button(340, 220, 'menulink', this.startMap, this);
		this.helpButton = this.add.button(340, 290, 'menulink', this.startHelp, this);
		this.aboutButton = this.add.button(340, 355, 'menulink', this.startAbout, this);
		this.exitButton = this.add.button(340, 420, 'menulink', this.exitGame, this);
		if (this.game.music.isPlaying)
			this.toggleMusicButton = this.add.button(50, 50, 'silenciador', this.stopMusic, this);
		else
			this.toggleMusicButton = this.add.button(50, 50, 'silenciador-cross', this.startMusic, this);
		
		var screenType = (this.scale.isFullScreen) ? 'normalscreen' : 'fullscreen';
				
		this.fullscreenButton = this.add.button(680, 75, screenType, this.toogleFullscreen, this)
				
		this.scale.enterFullScreen.add(function() {
			if(typeof this.fullscreenButton !== 'undefined')
				this.fullscreenButton.loadTexture('normalscreen');
		}, this);
	    this.scale.leaveFullScreen.add(function() {
	    	if(typeof this.fullscreenButton !== 'undefined')
	    		this.fullscreenButton.loadTexture('fullscreen');
		}, this);
		
		clickeables.add(this.playButton, this.exitButton, this.mapButton, this.aboutButton, this.toggleMusicButton, 
				this.helpButton, this.fullscreenButton);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {
		this.state.start(lastState);
	},
	
	startMap: function (pointer) {
		this.state.start('MapState');
	},
	
	startAbout: function (pointer) {
		this.state.start('AboutState');
	},
	
	startHelp: function (pointer) {
		this.state.start('HelpState');
	},
	
	startMusic: function (pointer) {
		this.game.music.resume();
		this.toggleMusicButton.destroy();
		this.toggleMusicButton = this.add.button(50, 50, 'silenciador', this.stopMusic, this);
		clickeables.add(this.toggleMusicButton);
	},
	
	stopMusic: function (pointer) {
		this.game.music.pause();
		this.toggleMusicButton.destroy();
		this.toggleMusicButton = this.add.button(50, 50, 'silenciador-cross', this.startMusic, this);
		clickeables.add(this.toggleMusicButton);
	},
	
	exitGame: function (pointer) {
		alert("Para salir, simplemente cierra la ventana del navegador.\nALERTA: TODO TU PROGRESO SE PERDERA.");
	},
	
	toogleFullscreen: function() {
		if(this.scale.isFullScreen) {
			console.log("isfull");
			this.scale.stopFullScreen();
		}else{
			console.log("isnotfull");
			this.scale.startFullScreen(false);
			
		}
	}

};

game.state.add('MenuState',States.MainMenu);