const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const levelText = document.getElementById("level")
const scoreText = document.getElementById("score");

const nextCanvas = document.getElementById("next");
const nextCtx = nextCanvas.getContext("2d");

const COLS = 10;
const ROWS = 20;
const SIZE = 30;

let colors = ["#00ff88","#ff3b3b","#3b8f26","#facc15"];
let currentColor = 
colors[Math.floor(Math.random() *
colors.length)];
let nextColor =
colors[Math.floor(Math.random() *
colors.length)];

let board = [];
let score = 0;
let level = 1;

for(let y = 0; y < ROWS; y++){

  board[y] = [];

  for(let x = 0; x < COLS; x++){

    board[y][x] = 0;

  }

}

const pieces = [

  [
    [1,1],
    [1,1]
  ],

  [
    [1,1,1],
    [0,1,0]
  ],

  [
    [1,1,1,1]
  ],

  [
    [1,0],
    [1,0],
    [1,1]
  ],

  [
    [1],
    [1],
    [1]
  ]

];

function randomPiece(){

  return pieces[
    Math.floor(Math.random() * pieces.length)
  ];

}

let currentPiece = randomPiece();

let nextPiece = randomPiece();

let pieceX = 4;
let pieceY = 0;


function drawCell(x,y,color="#00ff88"){

  ctx.fillStyle = color;

  ctx.fillRect(
    x * SIZE,
    y * SIZE,
    SIZE,
    SIZE
  );

  ctx.strokeStyle = "black";

  ctx.strokeRect(
    x * SIZE,
    y * SIZE,
    SIZE,
    SIZE
  );

}

function drawBoard(){

  for(let y = 0; y < ROWS; y++){

    for(let x = 0; x < COLS; x++){

      if(board[y][x]){

        drawCell(x,y,board[y][x]);

      }

    }

  }

}

function drawPiece(){

  for(let y = 0; y < currentPiece.length; y++){

    for(let x = 0; x < currentPiece[y].length; x++){

      if(currentPiece[y][x]){

        drawCell(
          pieceX + x,
          pieceY + y,
          currentColor
        );

      }

    }

  }

}

function drawNext(){

  nextCtx.clearRect(0,0,120,120);

  for(let y = 0; y < nextPiece.length; y++){

    for(let x = 0; x < nextPiece[y].length; x++){

      if(nextPiece[y][x]){

        nextCtx.fillStyle = "#00ff88";

        nextCtx.fillRect(
          x * 30,
          y * 30,
          30,
          30
        );

      }

    }

  }

}

function collision(){

  for(let y = 0; y < currentPiece.length; y++){

    for(let x = 0; x < currentPiece[y].length; x++){

      if(currentPiece[y][x]){

        let newX = pieceX + x;
        let newY = pieceY + y;

        if(
          newY >= ROWS ||
          newX < 0 ||
          newX >= COLS ||
          board[newY][newX]
        ){
          return true;
        }

      }

    }

  }

  return false;

}

function mergePiece(){

  for(let y = 0; y < currentPiece.length; y++){

    for(let x = 0; x < currentPiece[y].length; x++){

      if(currentPiece[y][x]){

        board[pieceY + y][pieceX + x] = currentColor;

      }

    }

  }

}

function clearLines(){

  for(let y = ROWS - 1; y >= 0; y--){

    let full = true;

    for(let x = 0; x < COLS; x++){

      if(board[y][x] == 0){

        full = false;

      }

    }

    if(full){

      board.splice(y,1);

      let newRow = [];

      for(let i = 0; i < COLS; i++){
        newRow.push(0);
      }

      board.unshift(newRow);

      y++;

      score += 10;
      scoreText.innerHTML = "Score : " + score;

      if(score >= 20 && level == 1){
        level = 2;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(gameLoop, 280);
    }

    if(score >= 40 && level == 2){
        level = 3;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(gameLoop, 260);
    }

    if(score >= 60 && level == 3){
        level = 4;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(gameLoop, 240);
    }

    if(score >= 80 && level == 4){
        level = 5;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(gameLoop, 200);
    }

    }

  }

}

function update(){

  pieceY++;

  if(collision()){

    pieceY--;

    mergePiece();

    clearLines();

    currentPiece = nextPiece;

    nextPiece = randomPiece();

    currentColor = nextColor;
    nextColor =
    colors[Math.floor(Math.random() *
    colors.length)];

    pieceX = 4;
    pieceY = 0;

    if(collision()){

        clearInterval(game);

      alert("GAME OVER");

      location.reload();

    }

  }

}

function draw(){

  ctx.clearRect(0,0,300,600);

  drawBoard();

  drawPiece();

  drawNext();

}

function gameLoop(){

  update();

  draw();

}

document.addEventListener("keydown", move);

function move(event){

  if(event.key == "ArrowLeft"){

    pieceX--;

    if(collision()){
      pieceX++;
    }

  }

  if(event.key == "ArrowRight"){

    pieceX++;

    if(collision()){
      pieceX--;
    }

  }

  if(event.key == "ArrowDown"){

    pieceY++;

    if(collision()){
      pieceY--;
    }

  }

}

function moveLeft(){

  pieceX--;

  if(collision()){
    pieceX++;
  }

}

function moveRight(){

  pieceX++;

  if(collision()){
    pieceX--;
  }

}

function restartGame(){

  location.reload();

}

let gameSpeed = 300; 
let game = setInterval(gameLoop, gameSpeed);
let paused = false;

function stopGame(){

    if(paused == false){

        clearInterval(game);
        paused = true;

    }else{

        game = setInterval(gameLoop, gameSpeed);
        paused = false;

    }
}