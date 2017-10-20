var score = 0,
	gscore = 0,
	ghost = true;
var player = {
	x: 50,
	y: 100,
	pacMouth: 320,
	pacDirection: 0,
	psize: 32
}

var enemy = {
	x: 0,
	y: 0,
	speed: 5,
	moving: 0,
	dirx: 0,
	diry: 0
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
	var speed = 5;
	switch (kC) {
		case 39: //right

			player.x += speed;
			player.pacDirection = 0;
			render();
			break;
		case 37: //left
			player.x -= speed;
			player.pacDirection = 64;
			render();
			break;
		case 38: //up
			player.y -= speed;
			player.pacDirection = 96;
			render();
			break;
		case 40: //down
			player.y += speed;
			player.pacDirection = 32;
			render();
			break;
	}
	//---mouth moving
	if (player.pacMouth == 320) {
		player.pacMouth = 352;
	} else {
		player.pacMouth = 320;
	}

}


function num(n) {
	return Math.floor(Math.random * n);
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


	if (!ghost) {
		enemy.ghostNum = num(5) * 64;
		enemy.x = num(450);
		enemy.y = num(250) + 30;
		ghost = true;
	}
	if (enemy.moving < 0) {
		enemy.moving = (num(30) * 3) + 10 + num(1);
		enemy.speed = num(4) + 1;
		enemy.dirx = 0;
		enemy.diry = 0;
		if (enemy.moving % 2) {
			if (player.x < enemy.x) {
				enemy.dirx = -enemy.speed;
			} else {
				enemy.dirx = enemy.speed;
			}
		} else {
			if (player.y < enemy.y) {
				enemy.diry = -enemy.speed;
			} else {
				enemy.diry = enemy.speed;
			}
		}
	}
	enemy.moving--;
	enemy.x = enemy.x + enemy.dirx;
	enemy.y = enemy.y + enemy.diry;

	ctx.drawImage(mainImage, player.pacMouth, player.pacDirection, 32, 32, player.x, player.y, player.psize, player.psize);
	ctx.drawImage(mainImage, enemy.ghostNum, 0, 32, 32, enemy.x, enemy.y, 32, 32);
	enemy.moving--;
	enemy.x = enemy.x + enemy.dirx;
	enemy.y = enemy.y + enemy.diry;

	ctx.font = "20px Veranda";
	ctx.fillStyle = "white";
	ctx.fillText("PACMAN: " + score + " vs GHOST   " + gscore, 2, 18);

	//----frame
	var X = canvas.width - 32;
	var Y = canvas.height - 32;
	if (player.x > X) {
		player.x = 0;
	}
	if (player.x < 0) {
		player.x = X;
	}
	if (player.y > Y) {
		player.y = 0;
	}
	if (player.y < 0) {
		player.y = Y;
	}
	//---frame


}
