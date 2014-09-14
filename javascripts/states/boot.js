States.BootState = function (game) {
	this.game = game;
};

States.BootState.prototype = {

    preload: function () {

        this.load.image('preloaderBar', 'images/preloadr_bar.png');
        this.load.image('preloaderBackground', 'images/pantallas/preloader.jpg');
    },

    create: function () {
        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;
		this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 2048;
            this.scale.maxHeight = 1500;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);

        }
        
        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('PreloaderState');

    }

};

game.state.add('BootState',States.BootState);