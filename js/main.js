if (!localStorage.getItem('Score_board')) {
    localStorage.setItem('Score_board', JSON.stringify([]));
}
let score_board = JSON.parse(localStorage.getItem('Score_board'));
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
const modal = document.getElementById("myModal");
const modalEnd = document.getElementById("myModalEnd");
const playerName = document.getElementById('name');
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDn = false;
let isAttack = false;
let isOver = false;
let isWin = false;
let lv = 0;
let enemyAttackTimes = 1000;
let playerAttSpeed = 150;


const imgPlayer = document.getElementById("player");
const imgShip1 = document.getElementById("ship_1")
const imgShip2 = document.getElementById("ship_2")
const imgBullet = document.getElementById("player-bullets");
const imgBullet_1 = document.getElementById("bullets_1");
const imgBullet_2 = document.getElementById("bullets_2");

// tạo sự kiện khi nhấn nút
document.addEventListener("keydown", (event) => {
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
let enemies = [];
let imgShip = []
let bullets = [];
let typeBullets = [];
let playerBullet = new TypeBullets('player', 200, imgBullet)
let bul_1 = new TypeBullets('T1', 200, imgBullet_1)
let bul_2 = new TypeBullets('T2', 300, imgBullet_2)
imgShip.push(imgShip1);
imgShip.push(imgShip2)

typeBullets.push(bul_1);
typeBullets.push(bul_2);


function newGame() {
    enemyAttackTimes = 2000;
    isWin = false;
    isOver = false;
    lv = 0;
    enemies = [];
    bullets = [];
    let name = playerName.value;
    if (name === '') {
        alert("please enter name");
        return;
    }
    player = new Player(name, imgPlayer, imgPlayer.width);
    modal.style.display = "none";
    canvas.style.display = "block"
    ctx.beginPath();
    ctx.fillStyle = "#fc0000";
    ctx.textAlign = "center";
    ctx.font = ("30px 'Black Ops One', cursive");
    ctx.fillText(">>>press any key to start<<<", canvas.width / 2, canvas.height / 2);
    ctx.closePath();
    document.addEventListener(("keydown"), start);
}

function start() {
    document.removeEventListener("keydown", start);
    generatingEnemies();
    gamePlay();
    playerAttack();
    enemiesAttack();
}

function gamePlay() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isWin) {
        endGame();
        return;
    } else if (isOver) {
        endGame();
        return
    }
    drawBullets();
    drawEnemies();
    player.draw();
    playerMove();
    showScore();
    showHP();
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
    if (isOver || isWin) {
        return
    }
    if (isAttack) {
        let bullet = new Bullets(true, player.x + (player.size / 4), player.y, playerBullet.img, playerBullet.dame)
        bullets.push(bullet);
    }
    setTimeout(playerAttack, playerAttSpeed)

}

function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        let b = bullets[i];
        b.draw();
        b.move();
        if (b.y + b.size < 0 || b.y > canvas.height - 10) {
            bullets.splice(i, 1)
        }
        if (!b.isPlayer) {
            if (b.x > player.x + 5 && b.x < player.x + player.size - 5 && b.y > player.y + 10 && b.y < player.y + player.size) {
                bullets.splice(i, 1);
                player.hp -= b.dame;
                if (player.hp <= 0) {
                    isOver = true;
                }
            }
        } else {
            for (let j = 0; j < enemies.length; j++) {
                let e = enemies[j];
                if (b.x > e.x && b.x < e.x + e.size && b.y > e.y && b.y < e.y + e.size - 20) {
                    e.hp -= b.dame;
                    player.score += 10;
                    bullets.splice(i, 1);
                    if (e.hp <= 0) {
                        enemies.splice(j, 1);
                        player.score += e.point;
                    }
                }

            }
        }
    }

}

function generatingEnemies() {
    enemies = [];
    for (let i = 0; i < 10; i++) {
        let x = Math.ceil((canvas.width - 100) * Math.random());
        let y = Math.ceil(canvas.height / 2 * Math.random());
        let i = Math.floor(2 * Math.random());
        let enemy = new Enemy(imgShip[i], x, y, typeBullets[i], typeBullets[i].dame * 4);
        enemies.push(enemy);
    }
}

function drawEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        let e = enemies[i];
        e.draw();
        e.x += e.move_x;
        e.y += e.move_y;
        if (e.x > player.x && e.x + e.size < player.x + player.size && e.y > player.y && e.y + e.size < player.y + player.size) {
            player.hp -= 500;
            enemies.splice(i, 1)
            if (player.hp <= 0) {
                isOver = true;
            }
        }
        if (e.y + e.size > canvas.height - 200 || e.y < 0) {
            e.move_y = -e.move_y;
        }
        if (e.x + e.size > canvas.width || e.x < 0) {
            e.move_x = -e.move_x;
        }
    }
    if (lv < 1 && enemies.length === 0) {
        generatingEnemies();
        lv++;
    }
    if (lv === 1 && enemies.length === 0) {
        isWin = true;
    }
}

function enemiesAttack() {
    if (isOver || isWin) {
        return
    }
    let i = Math.floor(Math.random() * enemies.length);
    let bullet = new Bullets(false, enemies[i].x + 15, enemies[i].y + 35, enemies[i].typeBullet.img, enemies[i].typeBullet.dame);
    bullets.push(bullet);
    setTimeout(enemiesAttack, enemyAttackTimes - (enemies.length * 90))
    // setTimeout(enemiesAttack, 100)
}

function showScore() {
    ctx.beginPath();
    ctx.font = ("30px 'Black Ops One', cursive");
    ctx.fillStyle = "#fc0000";
    ctx.textAlign = "center";
    ctx.fillText(player.score, canvas.width / 2, 50);
    ctx.fillText("Your Score", canvas.width / 2, 20);
    ctx.closePath();
}

function endGame() {
    canvas.style.display = "none";
    modalEnd.style.display = "block";
    let newScore = {
        name: player.name,
        score: player.score,
    }
    score_board.sort(compare);
    if (score_board.length < 5) {
        score_board.push(newScore);
        localStorage.setItem('Score_board', JSON.stringify(score_board));
    } else {
        if (newScore.score > score_board[score_board.length - 1].score) {
            score_board.splice(score_board.length - 1, 1, newScore);
            localStorage.setItem('Score_board', JSON.stringify(score_board));
        }
    }
    let str = '';
    if (isOver) {
        str = 'Game Over!';
    } else {
        str = 'Victorious'
    }
    document.getElementById('player-info').innerHTML = `
        <h3>${str} </h3>
        <h4>${player.name}</h4>
        <h4>Score: ${player.score}</h4>
    `
    setTimeout(showHighestScore, 400)

}

function showMenu() {
    modal.style.display = "block";
    modalEnd.style.display = "none";
}

function showHighestScore() {
    let str = '';
    score_board.sort(compare);
    for (let i = 0; i < score_board.length; i++) {
        str += `
        <tr>
        <td>${i + 1}</td>
        <td>${score_board[i].name}</td>
        <td>${score_board[i].score}</td>
        </tr>
        `
    }
    document.getElementById("leader_board").innerHTML = str;
}

function compare(a, b) {
    let compare = 0;
    if (a.score > b.score) {
        compare = -1;
    } else if (a.score < b.score) {
        compare = 1;
    }
    return compare;
}

function showHP() {
    ctx.beginPath();
    ctx.font = ("30px 'Black Ops One', cursive");
    ctx.fillStyle = "green";
    ctx.textAlign = "left";
    ctx.fillText("HP", 40, canvas.height - 50);
    ctx.fillText(player.hp, 40, canvas.height - 20);
    ctx.closePath();
}



