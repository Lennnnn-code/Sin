const canvas = document.getElementById("game");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

const ground = canvas.height - 120;

const player = {

    x:100,
    y:ground,

    width:40,
    height:100,

    color:"white",

    speed:6,

    velocityY:0,

    jumpPower:-18,

    gravity:0.8,

    onGround:true,

    direction:1,

    moving:false,

    attacking:false,

    attackingAngel:0,

    hp:100

};

const enemy = {

    x:700,
    y:ground,

    width:40,
    height:100,

    color:"orange",

    speed:3,

    direction:-1,

    moving:false,

    attacking:false,

    attackAngle:0,

    hp:100

};

let keys = {};

document.addEventListener("keydown",(e)=>{

    keys[e.key] = true;

    if(e.key == " "){

        player.attacking = true;

        player.attackingAngle = 40;

        setTimeout(()=>{

            player.attacking = false;

            player.attackingAngle = 0;

        },150);
    }

});

document.addEventListener("keyup",(e)=>{

    keys[e.key] = false;

});

const leftBtn = document.getElementById("leftBtn");

const rightBtn = document.getElementById("rightBtn");

const jumpBtn = document.getElementById("jumpBtn");

const attackBtn = document.getElementById("attackBtn");

const backBtn = document.getElementById("backBtn");

const pauseBtn = document.getElementById("pauseBtn");

backBtn.onclick = function(){

    window.location.href = "index.html";
};

pauseBtn.onclick = function(){

    paused = !paused;
}

leftBtn.onpointerdown = () => {

    keys["a"] = true;

};

leftBtn.onpointerup = () => {

    keys["a"] = false;

};


rightBtn.onpointerdown = () => {

    keys["d"] = true;

};

rightBtn.onpointerup = () => {

    keys["d"] = false;

};

jumpBtn.onpointerdown = () => {

    if(player.onGround){

        player.velocityY = player.jumpPower;

        player.onGround = false;

    }

};


attackBtn.onpointerdown = () => {

    player.attacking = true;

    player.attackAngle = 40;

    setTimeout(() => {

        player.attacking = false;

        player.attackAngle = 0;

    },150);

};

function movePlayer(){

    player.moving=false;

    // kiri
    if(keys["a"]){

        player.x -= player.speed;

        player.direction = -1;

        player.moving = true;

    }

    // kanan
    if(keys["d"]){

        player.x += player.speed;

        player.direction = 1;

        player.moving = true;

    }

    // lompat
    if(keys["w"] && player.onGround){

        player.velocityY = player.jumpPower;

        player.onGround = false;

    }

    // gravity
    player.velocityY += player.gravity;

    player.y += player.velocityY;

    // tanah
    if(player.y >= ground){

        player.y = ground;

        player.velocityY = 0;

        player.onGround = true;

    }

}

function drawStickman(character){

    let walk = 0;

    if(character.moving){

    walk = Math.sin(Date.now() * 0.02) * 10;

}

    ctx.strokeStyle = character.color;

    ctx.lineWidth = 5;

    // kepala
    ctx.beginPath();

    ctx.arc(character.x, character.y - 80, 15, 0, Math.PI * 2);

    ctx.stroke();

    // badan
    ctx.beginPath();

    ctx.moveTo(character.x, character.y - 65);

    ctx.lineTo(character.x, character.y - 20);

    ctx.stroke();

    // tangan
    ctx.beginPath();

    ctx.moveTo(character.x - 25, character.y - 50 - walk * 0.3);

    ctx.lineTo(character.x + 25, character.y - 50 + walk * 0.3);

    ctx.stroke();

    // kaki kiri
    ctx.beginPath();

    ctx.moveTo(character.x, character.y - 20);

    ctx.lineTo(character.x - 15 + walk, character.y + 20);

    ctx.stroke();

    // kaki kanan
    ctx.beginPath();

    ctx.moveTo(character.x, character.y - 20);

    ctx.lineTo(character.x + 15 - walk, character.y + 20);

    ctx.stroke();

    // pedang
    ctx.save();

    ctx.translate(character.x + (30 * character.direction), character.y - 50);

    ctx.scale(character.direction,1);

    ctx.rotate(character.attackAngle * Math.PI / 180);

    ctx.strokeStyle = "cyan";

    ctx.beginPath();

    ctx.moveTo(0,0);

    ctx.lineTo(50,0);

    ctx.stroke();

    ctx.restore();

}

function drawHP(character){

    // background hp
    ctx.fillStyle = "red";

    ctx.fillRect(character.x - 40, character.y - 120, 80, 10);

    // hp isi
    ctx.fillStyle = "lime";

    ctx.fillRect(character.x - 40, character.y - 120, character.hp * 0.8, 10);

}

function drawGround(){

    ctx.fillStyle = "#333";

    ctx.fillRect(0,ground + 20,canvas.width,200);

}

let winnerText = "";
let paused = false;
let gameOver = false;

function checkWinner(){

    if(gameOver) return;

    if(player.hp <= 0){

        gameOver = true;

        winnerText = "BOT BET SU";

        setTimeout(()=>{

            location.reload();

        },2000);

    }

    if(enemy.hp <= 0){

        gameOver = true;

        winnerText = "JIR LAH GELO";

        setTimeout(()=>{

            location.reload();

        },2000);

    }

}



function gameLoop(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
 if(!gameOver && !paused){

    movePlayer();

    enemyAI();

    collision();

    attackHit();
 }
    checkWinner();

    drawGround();

    drawStickman(player);

    drawHP(player);

    drawStickman(enemy);

    drawHP(enemy);

    if(gameOver){

        ctx.fillStyle = "white";

        ctx.font = "60px Arial";

        ctx.textAlign = "center";

        ctx.fillText(winnerText,canvas.width / 2, canvas.height / 2);
    }

    if(paused){

        ctx.fillStyle = "white";

        ctx.font = "50px Arial";

        ctx.textAlign = "center";

        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
    }

    requestAnimationFrame(gameLoop);

}

function attackHit(){

    if(player.attacking){

        let distance = Math.abs(player.x - enemy.x);

        if(distance < 100){

            enemy.x += 20;

            enemy.hp -= 10;
        }
    }
}

function enemyAI(){

    enemy.moving = false;

    if(enemy.x > player.x + 80){

        enemy.x -= enemy.speed;

        enemy.direction = -1;

        enemy.moving = true;

    }

    else if(enemy.x < player.x - 80){

        enemy.x += enemy.speed;

        enemy.direction = 1;

        enemy.moving = true;

    }

    let distance = Math.abs(player.x - enemy.x);
    if(distance > 60 && distance < 90 && ! enemy.attacking){

        enemy.attacking = true;

        enemy.attackingAngle = -40;

        player.x -= 30;

        player.hp -= 10;

        setTimeout(()=>{

            enemy.attacking = false;

            enemy.attackingAngle = 0;

        },150);
    }
}

function collision(){

    let distance = Math.abs(player.x - enemy.x);

    if(distance < 60){

        if(player.x < enemy.x){

            player.x -= 3;

        }else{

            player.x += 3;
        }
    }
}

window.onload = () => {

    if(document.documentElement.requestFullscreen){

        document.documentElement.requestFullscreen();
    }
};

gameLoop();