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
var ganoMinijuegoPuzzle = false;
var clickeables = {};
var menuIcon;
var lastState = "BeginState";
var header;
var puzzleCanvas;
var isFullScreen = false;
var transitions;
var ultimoEstado;
var keyboard = {};
var emilioSprite = 'emilio'

var minimosca = null;
/**
 * Puede moverse?
 */
var emilioCanMove=true;
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
		transitions.to('MenuState');
	}, this);
	
	if(game.device.desktop){
		keyboard.isDownPressed = function() {return false};
		keyboard.isUpPressed = function() {return false};
		keyboard.isLeftPressed = function() {return false};
		keyboard.isRightPressed = function() {return false};
	}else{
		enableKeyboard();
	}

	hideHeader();

};

function enableKeyboard(){
	var x = 1000;
	var y = 600;
	keyboard.arrowUp = game.add.sprite(100, y-130, 'arrowkey');
	keyboard.arrowUp.inputEnabled = true;
	keyboard.arrowUp.fixedToCamera = true;
	
	keyboard.arrowDown = game.add.sprite(100, y, 'arrowkey');
	keyboard.arrowDown.inputEnabled = true;
	keyboard.arrowDown.fixedToCamera = true;
	keyboard.arrowDown.scale.y = -1;
	
	keyboard.arrowLeft = game.add.sprite(30, y, 'arrowkey');
	keyboard.arrowLeft.inputEnabled = true;
	keyboard.arrowLeft.fixedToCamera = true;
	keyboard.arrowLeft.angle = 270;
	
	keyboard.arrowRight = game.add.sprite(245, y-75, 'arrowkey');
	keyboard.arrowRight.inputEnabled = true;
	keyboard.arrowRight.fixedToCamera = true;
	keyboard.arrowRight.angle = 90;
	
	keyboard.isDownPressed = function(){ return keyboard.arrowDown.input.pointerDown(game.input.activePointer.id); };
	keyboard.isUpPressed = function(){ return keyboard.arrowUp.input.pointerDown(game.input.activePointer.id); };
	keyboard.isLeftPressed = function(){ return keyboard.arrowLeft.input.pointerDown(game.input.activePointer.id); };
	keyboard.isRightPressed = function(){ return keyboard.arrowRight.input.pointerDown(game.input.activePointer.id); };
	
}

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
		var sprite = game.add.sprite(collectables.offset, 7, key);
		collectables.offset += (15 + sprite.width);
		collectables.sprites.push(sprite);
	}
};

showCollectables = function() {
	collectables.offset = 320;
	collectables.members.forEach(function (element, index, array) {
		var sprite = game.add.sprite(collectables.offset, 7, element);
		sprite.fixedToCamera = true;
		collectables.offset += (15 + sprite.width);
		collectables.sprites.push(sprite);
	})	
};

hideCollectables = function() {
	collectables.sprites.forEach(function (element, index, array) {
		element.destroy();
	})
};
