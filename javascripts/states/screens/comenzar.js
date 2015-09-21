States.Map = function (game) {

};

States.Map.prototype = {

	create: function () {

 		this.add.sprite(0, 0, 'comenzar');
 		
		this.beginButton = this.add.button(800, 10, 'flecha', this.begin, this);
		
		this.beginButton.scale.x = -1;
		
		clickeables.add(this.beginButton);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},
	begin: function() {
		transitions.to('AndenState');
	}
	
	

};

game.state.add('BeginState',States.Map);