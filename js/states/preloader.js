States.PreloaderState = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

States.PreloaderState.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(185, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		this.load.image('ticket', 'images/ticket.jpg');
		this.load.image('dialog', 'images/dialog.png');
		this.load.image('vagon', 'images/vagon.png');
        this.load.image('pared', 'images/pared.png');
        this.load.image('floor', 'images/platform.png');
        this.load.image('locomotora', 'images/tren/locomotora.png');
//        this.load.image('emilio', 'images/emilio.png');
        
        this.load.spritesheet('emilio', 'images/emilio-caminando.png', 144, 323);
        this.load.image('mamadera', 'images/mamadera.png');
        this.load.image('cenicero', 'images/cenicero.png');
        this.load.image('copa', 'images/copa.png');
        
        this.load.image('minimosca', 'images/minimosca.png');
        this.load.image('mosca1', 'images/moscas/mosca1.png');
        this.load.image('mosca2', 'images/moscas/mosca2.png'); 
        this.load.image('mosca3', 'images/moscas/mosca3.png'); 
        this.load.image('mosca4', 'images/moscas/mosca4.png');
        this.load.image('silueta', 'images/moscas/silueta.png');
        
        this.load.image('sky', 'images/sky.png');
        this.load.image('locomotora', 'images/tren/locomotora.png');
        this.load.image('emilioEspaldas', 'images/emilio-espaldas.png');
        for (var i=2;i<=3;i++)
        { 
            this.load.image('vagon'+i, 'images/tren/vagon'+ i +'.png');
        }
        
        for (var i=0;i<=9;i++)
        { 
            this.load.image('numero'+i, 'images/numeros/numero'+ i +'.jpeg');
        }
        
        this.load.image('ticketOffice', 'images/ticketOffice.jpg');
        this.load.image('cartel', 'images/sign.png');
        this.load.image('vendedor', 'images/vendeilusiones.png');
        this.load.image('flecha', 'images/arrow_back.png');
        
        this.load.image('playButton', 'images/play.png');

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

		if (this.cache.isSoundDecoded('musica') && this.ready == false)
		{
			this.ready = true;
			this.state.start('VagonState');
//			this.state.start('MenuState');
		}

	}

};

game.state.add('PreloaderState',States.PreloaderState);