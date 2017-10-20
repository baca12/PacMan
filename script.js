var score = 0;
var gscore = 0;
var player = {
	x: 50,
	y: 100,
	pacMouth: 320,
	pacDirection: 0,
	psize: 32
	var speed = 5;
}



var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 600;
mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src = "pac.png";
document.body.appendChild(canvas);



document.addEventListener("keydown", klick);

function klick() {
	var klik = {};
	klik[event.keyCode] = true; //pokazuje nr klawiasza
	move(klik);
}

function move(klik) {

	var kC = event.keyCode;

	switch (kC) {
		case 39: //right

			player.x += speed;
			render();
			break;
		case 37: //left
			player.x -= speed;
			render();
			break;
		case 38: //up
			player.y -= speed;
			render();
			break;
		case 40: //down
			player.y += speed;
			render();
			break;
	}

}


function checkReady() {
	this.ready = true;
	playgame();
}

function playgame() {
	render();
}

function render() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(mainImage, player.pacMouth, player.pacDirection, 32, 32, player.x, player.y, player.psize, player.psize);
	ctx.font = "20px Veranda";
	ctx.fillStyle = "white";
	ctx.fillText("PACMAN: " + score + " vs GHOST   " + gscore, 2, 18);

	//----frame
	var X = 568;
	var Y = 368;
	if (player.x > X) {
		player.x = X;
	}
	if (player.x < 1) {
		player.x = 5;
	}
	if (player.y > Y) {
		player.y = Y;
	}
	if (player.y < 1) {
		player.y = 5;
	}
	//---frame


}
