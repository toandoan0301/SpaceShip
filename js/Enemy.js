class Enemy{
    img;
    x;
    y;
    typeBullet;
    size;
    hp;
    move_x;
    move_y;
    point;
    constructor(img,x,y,type,point) {
        this.img=img;
        this.x=x;
        this.y=y;
        this.typeBullet=type;
        this.size= 50;
        this.move_x=3;
        this.move_y=1;
        this.hp=point;
        this.point=point;
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,this.size+20,this.size)
    }
}