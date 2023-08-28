const canvas = document.getElementById("game-board");
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
const ctx = canvas.getContext("2d");
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDn = false;
let isAttack = false;

const imgPlayer = document.getElementById("player");
const imgShip1= document.getElementById("ship_1")
const imgbullets = document.getElementById("player-bullets");
const imgBullet_1= document.getElementById("bullets_1");

// tạo sự kiện khi nhấn nút
document.addEventListener("keydown", (event) => {
    console.log(event)
    if (event.key === "ArrowLeft") {
        moveLeft = true;
    }
    if (event.key === "ArrowRight") {
        moveRight = true;
    }
    if (event.key === "ArrowUp") {
        moveUp = true;
    }
    if (event.key === "ArrowDown") {
        moveDn = true;
    }
    if (event.code === 'Space') {
        isAttack = true;
    }
});
document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft = false;
    }
    if (event.key === "ArrowRight") {
        moveRight = false;
    }
    if (event.key === "ArrowUp") {
        moveUp = false;
    }
    if (event.key === "ArrowDown") {
        moveDn = false;
    }
    if (event.code === 'Space') {
        isAttack = false;
    }
});


let player;
let enemies=[];
let bullets = [];
let typeBullets =[];
let playerBullet = new TypeBullets('player', 100, imgbullets)
let bul_1 = new TypeBullets('T1',100,imgBullet_1)

typeBullets.push(bul_1);

function start() {
    player = new Player('Gin', imgPlayer, imgPlayer.width);
    generatingEnemiese();
    playerAttack();
    gamePlay();
    enemiesAttack();
}
start()

function gamePlay() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)// xoá vật thể thể trong khu vực được chọn
    drawBullets();
    drawEnemies();
    player.draw();
    playerMove();
    requestAnimationFrame(gamePlay);
}

function playerMove() {
    if (moveDn && player.y < canvas.height - player.size) {
        player.moveDn();
    }
    if (moveUp && player.y > 0) {
       player.moveUp();
    }
    if (moveLeft && player.x > 0) {
       player.moveLeft();
    }
    if (moveRight && player.x < canvas.width - player.size) {
       player.moveRigth();
    }
}

function playerAttack() {
    if (isAttack) {
        let bullet = new Bullets(true, player.x + (player.size / 4), player.y, playerBullet)
        console.log(player.size);
        bullets.push(bullet);
    }
    setTimeout(playerAttack, 250)

}

function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        let b = bullets[i];
        b.draw();
        b.move();
        if (b.x + b.size < 0) {
            bullets.splice(i, 1)
        }
    }

}

function generatingEnemiese(){
    for (let i = 0; i < 10; i++) {
        let x= Math.ceil((canvas.width-100)*Math.random());
        let y= Math.ceil(canvas.height/2*Math.random());
        let enemy = new Enemy(imgShip1,x,y,bul_1);
        enemies.push(enemy);
    }
}
function  drawEnemies(){
    for (let i = 0; i < enemies.length; i++) {
        let e = enemies[i];
        e.draw();
        e.x+=e.move_x;
        e.y+=e.move_y;
        if(e.y+e.size>canvas.height-100 ||e.y<0){
            e.move_y=-e.move_y;
        }
        if(e.x+e.size>canvas.width || e.x<0){
            e.move_x=-e.move_x;
        }
    }
}

function enemiesAttack(){
    let i = Math.floor(Math.random()*enemies.length);
    let bullet = new Bullets(false,enemies[i].x+35,enemies[i].y+35,bul_1)
    bullets.push(bullet);
    console.log(bullets);
    setTimeout(enemiesAttack,200)
}


