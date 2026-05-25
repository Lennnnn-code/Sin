const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");

let dino = {
  x:50,
  y:180,
  width:80,
  height:80,

  velocityY:0,
  jumping:false
};

let cactus = {
  x:850,
  y:260,
  width:30,
  height:50
};

let gravity = 0.8;

let level = 1;
let score = 0;
let gameOver = false;

const dinoImg = new Image();

dinoImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///9mZmZiYmKPj4+VlZXZ2dn6+vpxcXGnp6deXl7Q0NDj4+P29vaAgIBra2u+vr56enqGhobu7u7p6embm5vFxcWurq7MzMzV1dW1tbWoqKjc3Nyamppubm59fX3AwMBapVfUAAADy0lEQVR4nO3d23aiMABAUcEbCuIF1KrV/v9fzrQmkQraIIGEeM7jDCJ7OmuRQgiDARERERHRw5KhwWLbmqqSIDRWMLatqSpJA2OlCK2EECFC+xkVnmxrCiUf18Z7g8JgORa7deDUPw4NwkqFI9u+txBWHFZh+OWncLFWTb0UhqdkI0qOMy+F2e1vdwgRIuwghAgR2pPJ3lIYT1R+Cv0fl77B7xYGQ4gQIUKECBEiRIgQIUKECBEiRIgQIUKEPRbOajW07asvXGzndXJgCl9NYTic2D7iutUWJraPuG4IEbofwpIw3jzONqayuufD9LJ41GXoJLH+qO3xA12r7O/v6z6T41KEdkKIEKH9nBDuD0vR1tgvZ2qfkTng6+fD0UydUo0NGoZyn7qHn2q0eFkoD8OksN60wzBKdHr1aJQwsCg09cWVIXwlhAjNhlCvuHgp+mPtoTBvMvEeYcMQ6oUQYZsh1KsvQvlgoM7nJr9qKJyUakWYyhXf1nuNzy1/LRLX7FHCVXnVOYPrCN2E6p7BbKnxuWhWvKnQCFhxtyLQ+UeuL1TfpyVsdekZhAgRIuy/8Evjc8c+C4N1dC3f3m+dqEsVNa/FOCZUp/78fuu46ToI1ZXHDS0L1Rd3Iwzz+KescCyeCY9i75G3QvnbU44QIcJ3FI6yu+aeCSumELQALAhv1w06E3aSEp62+2vbvcHJpC4J2wkhQoQIESJEiBAhQoQIESL8Lp+Kzr4K1WO2O1+FqoO1/64I+ytUtyl9FaZrOcVLZ95AH4XT06CFeXpOCbt+MdwbCNVNA1+F493hWtTR6KZzoSpbIUSIECFChH8L6y6JUC85sDhbE26iz/ynz1amWp5HYu+RvcVK5Ih/08os2Uuth4/aLWlDGF4cWnUOIUKE9kPogXAkplyeDUy6/L+Ta2uHhIP4JDo0/9Ed5b5iB8705ebNhTrPUlls31zY0XXtV0OIEKH9EPZfmG1Fh2f3NMKh2GrRP6Hq6XNPs53YqmI8i9CZEF5D6HIIr3knVHOblLB846PfwrVMKiL5Bws/hGkmlqPeyOsTyUb8ydwT4eNLS2NPhI+f2R2HCJ0L4V0IHaxCGAbeClfiQY3Vk7NFr4WrLBbLOz3evNfCcKGxOUIHKwgvGpv3W+j/zxDhdwWh43dIVYWzxUXjNUUF4aHxW426qSBM5fszn0w9uAmDqXzb5shtYnFMox5A0Rm13TZ3abZJRS+PvG9QhJZDeBdCB0N4Vx+F5/LrpJ+eD0vNnlwScKFsVH7ZxpNXvscVW+duC4mIiIiog/4BFhiJ092Kle4AAAAASUVORK5CYII=";

function drawDino(){

  ctx.drawImage(
    dinoImg,
    dino.x,
    dino.y,
    dino.width,
    dino.height
  );

}

function drawCactus(){

  ctx.fillStyle = "#ff3b3b";

  ctx.fillRect(
    cactus.x,
    cactus.y,
    cactus.width,
    cactus.height
  );

}

function update(){

  if(gameOver){
    return;
  }

  ctx.clearRect(0,0,800,300);

  // GRAVITY
  dino.velocityY += gravity;
  dino.y += dino.velocityY;

  // FLOOR
  if(dino.y > 220){

    dino.y = 220;

    dino.velocityY = 0;

    dino.jumping = false;

  }

  // MOVE CACTUS
  cactus.x -= 6;

  if(cactus.x < -30){

    cactus.x = 800;

    score++;

    scoreText.innerHTML =
    "Score : " + score;

    if(score >= 5 && level == 1){
        level = 2;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(update, 25);
    }

    if(score >= 10 && level == 2){
        level = 3;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(update, 22);
    }

    if(score >= 15 && level == 3){
        level = 4;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(update, 19);
    }

    if(score >= 20 && level == 4){
        level = 5;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(update, 16);
    }

    if(score >= 25 && level == 5){
        level = 6;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(update, 13);
    }

    if(score >= 30 && level == 6){
        level = 7;
        levelText.innerHTML = "Level : " + level;

        clearInterval(game);
        game = setInterval(update, 10);
    }

    if(score >= 35 && level == 7){
      level = 8;
      levelText.innerHTML = "Level : " + level;

      clearInterval(game);
      game = setInterval(update, 8);
    }

    if(score >= 40 && level == 8){
      level = 9;
      levelText.innerHTML = "Level : " + level;

      clearInterval(game);
      game = setInterval(update, 6);
    }

    if(score >= 50 && level == 9){
      level = 10;
      levelText.innerHTML = "Level : " + level;
    }

    if(level >= 10){

    gameOver = true;

    alert("KAMU MENANG!");

    location.reload();

    }


  }

  // COLLISION
  if(
    dino.x < cactus.x + cactus.width &&
    dino.x + dino.width > cactus.x &&
    dino.y < cactus.y + cactus.height &&
    dino.y + dino.height > cactus.y
  ){

    gameOver = true;

    alert("GAME OVER");

  }

  drawDino();

  drawCactus();

}

function jump(){

  if(dino.jumping == false){

    dino.velocityY = -15;

    dino.jumping = true;

  }

}

document.addEventListener("keydown", function(event){

  if(event.code == "Space"){

    jump();

  }

});

function restartGame(){

  location.reload();

}

let game = setInterval(update,32);
let paused = false;

function stopGame(){

    if(paused == false){

        clearInterval(game);
        paused = true;

    }else{

        game = setInterval(update, 20);
        paused = false;

    }
}