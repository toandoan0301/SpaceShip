class Bullets{
    isPlayer;
    x;
    y;
    img;
    speed;
    dame;
    constructor(isP,x,y,img,dame) {
        this.isPlayer=isP;
        this.x = x;
        this.y = y;
        this.img=img;
        this.speed = 4;
        this.dame=dame;
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,33,55);
    }
    move(){
        if(this.isPlayer){
            this.y-=this.speed;
        }else {
            this.y+=this.speed;
        }
    }
}
class TypeBullets{
    name;
    dame;
    img;
    constructor(name,dame,img) {
        this.name=name;
        this.dame=dame;
        this.img=img;
    }
}