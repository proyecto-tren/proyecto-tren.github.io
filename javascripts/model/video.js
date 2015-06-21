var Video = function(game, src, x, y){
	emilioCanMove = false;
    v2 = document.createElement("video");

    if (x === undefined) x = 50;
    if (y === undefined) y = 50;

    var flecha = game.add.sprite(0, 0, 'flecha');
    flecha.inputEnabled = true;
	flecha.events.onInputDown.add(function(){
		document.body.removeChild(v2);
		emilioCanMove = true;
	    flecha.destroy();
	});
	clickeables.add(flecha);
	
    v2.src = src;
    v2.id = 'video';
    v2.loop = false;
    v2.autoplay = true;
    v2.controls = false;
    v2.width = 1000;
    v2.height = 530;
    v2.style.top = y + "px";
    v2.style.left = game.canvas.style.marginLeft;
    document.body.appendChild(v2);

    v2.onended = function(){
        document.body.removeChild(v2);
        emilioCanMove = true;
        v2.dispatchEvent(new Event('end'));
        flecha.destroy();
    };
    
    return v2;
};