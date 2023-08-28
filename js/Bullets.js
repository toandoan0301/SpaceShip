class Bullets{
    isPlayer;
    x;
    y;
    type;
    speed;
    status;
    constructor(isP,x,y,type) {
        this.isPlayer=isP;
        this.x = x;
        this.y = y;
        this.type=type;
        this.speed = 4;
    }
    draw(){
        ctx.drawImage(this.type.img,this.x,this.y,33,58);
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