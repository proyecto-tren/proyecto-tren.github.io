States.Help = function (game) {

};

States.Help.prototype = {

	create: function () {

 		this.add.sprite(0, 0, 'comojugar');

		this.backButton = this.add.button(10, 10, 'flecha', this.back, this);
		
		clickeables.add(this.backButton);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},
	
	back: function() {
		transitions.to('MenuState');
	}

};

game.state.add('HelpState',States.Help);