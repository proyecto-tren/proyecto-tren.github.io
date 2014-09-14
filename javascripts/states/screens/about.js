States.About = function (game) {

};

States.About.prototype = {

	create: function () {

 		this.add.sprite(0, 0, 'acercade');

		this.backButton = this.add.button(10, 10, 'flecha', this.back, this);
		
		clickeables.add(this.backButton);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},
	
	back: function() {
		this.state.start('MenuState');
	}

};

game.state.add('AboutState',States.About);