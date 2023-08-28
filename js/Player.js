class Player{
    name;
    img;
    x;
    y;
    size;
    speed;
    hp;
    score;
    constructor(name,img,size) {
        this.name=name;
        this.img=img;
        this.size=size;
        this.speed=5;
        this.hp=100;
        this.score=0;
        this.x=canvas.width/2;
        this.y=canvas.height-this.size;
    }
    moveLeft(){
        this.x-=this.speed;
    }
    moveRigth(){
        this.x+=this.speed;
    }
    moveUp(){
        this.y-=this.speed;
    }
    moveDn(){
        this.y+=this.speed;
    }
    draw(){
        ctx.drawImage(this.img,this.x, this.y, this.size, this.size);
    }
}