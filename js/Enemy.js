class Enemy{
    img;
    x;
    y;
    typeBullet;
    size;
    hp;
    move_x;
    move_y;
    constructor(img,x,y,type) {
        this.img=img;
        this.x=x;
        this.y=y;
        this.typeBullet=type;
        this.size= 70;
        this.move_x=3;
        this.move_y=1;
        this.hp=50;
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,this.size,this.size)
    }
}