States.Map = function (game) {

};

States.Map.prototype = {

	create: function () {

 		this.add.sprite(0, 0, 'mapa');

		this.backButton = this.add.button(10, 10, 'flecha', this.back, this);
		this.tutoTicket01Button = this.add.button(200, 425, 'link1', this.showTutoTicket01, this);
		
		this.tutoVagon01Button = this.add.button(300, 425, 'link2', this.showTutoVagon01, this);
		
		clickeables.add(this.backButton, this.tutoTicket01Button, this.tutoVagon01Button);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},
	
	backToMap: function() {
		this.tuto.destroy();
		this.arrowToMap.destroy();
	},
	
	showTutoTicket01: function() {
		this.tuto = this.add.sprite(0, 0, 'tutoTicket01');
		this.arrowToMap = this.add.button(10, 10, 'flecha', this.backToMap, this);
		clickeables.add(this.arrowToMap);
	},
	
	showTutoVagon01: function() {
		this.tuto = this.add.sprite(0, 0, 'tutoVagon01');
		this.arrowToMap = this.add.button(10, 10, 'flecha', this.backToMap, this);
		clickeables.add(this.arrowToMap);
	},
	
	back: function() {
		transitions.to('MenuState');
	}
	
	

};

game.state.add('MapState',States.Map);