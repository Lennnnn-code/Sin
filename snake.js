const canvas = document.getElementById("game");

const ctx = canvas.getContext("2d");

const levelText = document.getElementById("level")

const scoreText = document.getElementById("score");

const box = 10;

let level = 1;
let score = 0;

let snake = [
  {
    x: 100,
    y: 100
  }
];

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};

let direction = "RIGHT";

document.addEventListener("keydown", changeDirection);

function changeDirection(event){

  if(event.key === "ArrowUp" && direction != "DOWN"){
    direction = "UP";
  }

  else if(event.key === "ArrowDown" && direction != "UP"){
    direction = "DOWN";
  }

  else if(event.key === "ArrowLeft" && direction != "RIGHT"){
    direction = "LEFT";
  }

  else if(event.key === "ArrowRight" && direction != "LEFT"){
    direction = "RIGHT";
  }

}

function draw(){

  ctx.clearRect(0,0,400,400);

  // FOOD
  ctx.fillStyle = "red";

  ctx.fillRect(
    food.x,
    food.y,
    box,
    box
  );

  // SNAKE
  for(let i = 0; i < snake.length; i++){

    ctx.fillStyle =
    i == 0 ? "#00ff88" : "#00cc66";

    ctx.beginPath();

    ctx.arc(

       snake[i].x + box / 2,
       snake[i].y + box / 2,
       box / 2.3,
       0,
       Math.PI * 2

    );

    ctx.fill();
    
  }
  let headX = snake[0].x;
  let headY = snake[0].y;

  // MOVE
  if(direction == "UP"){
    headY -= box;
  }

  if(direction == "DOWN"){
    headY += box;
  }

  if(direction == "LEFT"){
    headX -= box;
  }

  if(direction == "RIGHT"){
    headX += box;
  }

  // EAT FOOD
  if(headX == food.x && headY == food.y){

    score++;

    if(score >= 5 && level == 1){
        level = 2;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 190);
    }

    if(score >= 10 && level == 2){
        level = 3;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 180);
    }

    if(score >= 15 && level == 3){
        level = 4;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 170);
    }

    if(score >= 20 && level == 4){
        level = 5;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 160);
    }

    if(score >= 25 && level == 5){
        level = 6;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 150);
    }

    if(score >= 30 && level == 6){
        level = 7;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 140);
    }

    if(score >= 35 && level == 7){
        level = 8;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 130);
    }

    if(score >= 40 && level == 8){
        level = 9;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 120);
    }

    if(score >= 45 && level == 9){
        level = 10;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 110);
    }

    if(score >= 50 && level == 10){
        level = 11;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 100);
    }

    if(score >= 55 && level == 11){
        level = 12;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 90);
    }

    if(score >= 60 && level == 12){
        level = 13;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 80);
    }

    if(score >= 65 && level == 13){
        level = 14;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 70);
    }

    if(score >= 70 && level == 14){
        level = 15;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(draw, 60);
    }

    scoreText.innerHTML =
    "Score : " + score;

    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };

  }else{
    snake.pop();
  }

  let newHead = {
    x: headX,
    y: headY
  };

  // GAME OVER
  if(
    headX < 0 ||
    headY < 0 ||
    headX >= 400 ||
    headY >= 400
  ){

    clearInterval(game);

    alert("GAME OVER");

  }

  snake.unshift(newHead);

}

let game = setInterval(draw, 200);
let paused = false;


function setDirection(dir){

  if(dir == "UP" && direction != "DOWN"){
    direction = dir;
  }

  if(dir == "DOWN" && direction != "UP"){
    direction = dir;
  }

  if(dir == "LEFT" && direction != "RIGHT"){
    direction = dir;
  }

  if(dir == "RIGHT" && direction != "LEFT"){
    direction = dir;
  }

}

function restartGame(){
    location.reload();
}

function stopGame(){

    if(paused == false){

        clearInterval(game);
        paused = true;

    }else{

        game = setInterval(draw, 120);
        paused = false;

    }
}