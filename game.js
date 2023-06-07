function load_images(){
	enemy_image = new Image;
	enemy_image.src = "Assets/v1.png";

	player_img = new Image;
	player_img.src = "Assets/superhero.png";

	gem_img = new Image;
	gem_img.src = "Assets/gemm.png";

}


function init(){

	gameOver = false;
	canvas = document.getElementById("mycanvas");
	console.log(canvas);
	W = 700;
	H = 400;

	canvas.width = W;
	canvas.height = H;

	//context object
	pen = canvas.getContext('2d');
	//console.log(pen);

	box = {
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed:1.0,

	};
	e1 = {
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed:2.0,

	};
	e2 = {
		x : 300,
		y : 30,
		w : 60,
		h : 60,
		speed:2.7,

	};
	e3 = {
		x : 450,
		y : 20,
		w : 60,
		h : 60,
		speed:3.5,

	};

	enemy = [e1, e2, e3];

	player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		health : 50,
		speed : 2,
		moving : "false",

	};

	gem = {
		x : W - 100,
		y : H/2,
		w : 60,
		h : 60,

	};

	canvas.addEventListener('mousedown', function(){
		console.log("mousedown");
		player.moving = true;
	})

	canvas.addEventListener('mouseup', function(){
		console.log("mouseup");
		player.moving = false;
	})

}

function checkOverlap(rect1, rect2){
	if (rect1.x < rect2.x + rect2.w &&
		rect1.x + rect1.w > rect2.x &&
		rect1.y < rect2.y + rect2.h &&
		rect1.y + rect1.h > rect2.y) {
		 return true;
	 }

	 return false;
}

function draw(){
	
	pen.clearRect(0, 0, W, H);

	pen.fillStyle = "red";
	//pen.fillRect(box.x, box.y, box.w, box.h);
	//pen.drawImage(enemy_image, box.x, box.y, box.w, box.h);

	pen.drawImage(player_img, player.x, player.y, player.w, player.h);
	pen.drawImage(gem_img, gem.x, gem.y, gem.w, gem.h);
	for(let i = 0; i<enemy.length; i++){
		pen.drawImage(enemy_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
	}
	pen.fillStyle = "white";
	pen.fillText("Click to move", 10, 10);
	pen.fillText("Collect the Gem to win", 10, 20);
	pen.fillText("Health "+ player.health, 10, 30);
	pen.fillText("Damage by Covid Virus : -10", 10, 40);
	pen.fillText("Health Increase : +5 / movement", 10, 50);
	

}

function update(){
	
	if(player.moving == true){
		player.x += player.speed;
		player.health +=2;
		if(player.x > W - player.w || player.x < 0){
			player.speed *= -1;
		}
	}

	if(checkOverlap(player, gem)){
		console.log("WON!!!!!!!");
		alert("You Won!");
		gameOver = true;
	}
	for(let i = 0; i < enemy.length; i++){
		if(checkOverlap(enemy[i], player)){
			console.log("Hurt");
			player.health-= 10;
			if(player.health < 1){
				alert("Game Over, You Died");
				gameOver = true;
			}
		}
	}

	for(let i = 0; i < enemy.length; i++){
		enemy[i].y += enemy[i].speed;

		if(enemy[i].y > H - enemy[i].h || enemy[i].y < 0){
			enemy[i].speed *= -1;
		}
	}

	// box.y += box.speed;
	// if(box.y > H - box.h || box.y < 0){
	// 	box.speed *= -1;
	// }
}

function gameloop(){
	if(gameOver == true){
		clearInterval(f); 
	}
	draw();
	update();
	console.log("in gameloop");
}


load_images();
init();

var f = setInterval(gameloop, 10);
