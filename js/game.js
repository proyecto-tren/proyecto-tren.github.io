/**
 * Creamos el juego.
 */
var game = new Phaser.Game(800,600,Phaser.AUTO,'container');

/**
 * Aca se van a almacenar todos los estados del juego
 */
var States = {};

/**
 * Variables globales a todos los estados del juego
 */
var score = 0;
var ganoMinijuegoMosca = false;