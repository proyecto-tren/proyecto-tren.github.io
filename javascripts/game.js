/**
 * Creamos el juego.
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'container');

/**
 * Aca se van a almacenar todos los estados del juego
 */
var States = {};

/**
 * Variables globales a todos los estados del juego
 */
var score = 0;
var ganoMinijuegoMosca = false;
var clickeables = {};
var menuIcon;
var lastState = "AndenState";
var header;
/**
 * Aca se van a almacenar los diferentes objetos que va recolectando el personaje
 */
var collectables = {};
collectables.members = [];
collectables.offset = 320;
collectables.sprites = [];

clickeables.add = function(){
	for (var i = 0; i < arguments.length; i++) {
	    var child = arguments[i];
	    child.inputEnabled = true;
	    child.events.onInputOver.add(function(member) {
			document.body.className = "selected";
		}, this);
	    child.events.onInputDown.add(function(member) {
			document.body.className = "";
		}, this);
		child.events.onInputOut.add(function(member) {
			document.body.className = "";
		}, this);
	}
	
};

function __load_layout(){
	
	menuIcon = game.add.sprite(0, 60, 'menuIcon');
	menuIcon.inputEnabled = true;
	menuIcon.fixedToCamera = true;
	menuIcon.bringToTop();
	clickeables.add(menuIcon);
	
	header = game.add.sprite( 0, 0, 'header', 1);
	header.fixedToCamera = true;
	header.menuLink = game.add.sprite(10,10, 'menulink').kill();
	header.menuLink.scale.x = 1.30;
	header.menuLink.fixedToCamera = true;
	header.visible = false;
	clickeables.add(header.menuLink);

	menuIcon.events.onInputDown.add(function(member) {
		if(header.visible) hideHeader(); else showHeader();
	}, this);
	header.menuLink.events.onInputDown.add(function(member) {
		lastState = game.state.current;
		game.state.start('MenuState');
	}, this);

	hideHeader();
};

function showHeader() {
	header.visible = true;
	header.menuLink.revive();
	showCollectables();
};

function hideHeader(){
	hideCollectables();
	header.visible = false;
	header.menuLink.kill();
};

addCollectable = function(key){
	collectables.members.push(key);
	if (header.visible){
		var sprite = game.add.sprite(collectables.offset, 15, key);
		collectables.offset += (15 + sprite.width);
		collectables.sprites.push(sprite);
	}
};

showCollectables = function() {
	collectables.offset = 320;
	collectables.members.forEach(function (element, index, array) {
		var sprite = game.add.sprite(collectables.offset, 15, element);
		collectables.offset += (15 + sprite.width);
		collectables.sprites.push(sprite);
	})	
};

hideCollectables = function() {
	collectables.sprites.forEach(function (element, index, array) {
		element.destroy();
	})
};