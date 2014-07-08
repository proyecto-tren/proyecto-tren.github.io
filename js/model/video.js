var Video = function(game, src, x, y){
    game.paused = true;
    var v2 = document.createElement("video");
    if (x === undefined) x = 100;
    if (y === undefined) y = 100;
    
    v2.src = src;
    v2.id = 'video';
    v2.loop = false;
    v2.autoplay = true;
    v2.controls = false;
    v2.width = 600;
    v2.height = 400;
    v2.style.top = y + "px";
    v2.style.left = x + "px";
    document.body.appendChild(v2);

    v2.onended = function(){
        document.body.removeChild(v2);
        game.paused = false;
        v2.dispatchEvent(new Event('end'));
    };
    
    return v2;
};