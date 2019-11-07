class Player {
  constructor(x,y,h,w){
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
    this.dead = false;
    this.height = h;
    this.length = w;
    this.grounded = false;
    this.grav = createVector(0, 1.5);
    this.inventory = [];
  }

  show(){
    fill('#FF0000')
    rect(this.pos.x, this.pos.y, this.length, this.height);
  }
  update(){
    this.grounded = false;
    this.isTouchingGround();
    this.acc.mult(0);
    if(!this.grounded){
      this.acc.add(this.grav);
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);

  }
  isTouchingGround(){
    for(let i = 0; i < cols; i++){
      for(let other of terrains[terrainIndex][i]){
        if(other.type != 'air' && other.type != "cloud"){
          if (((this.pos.y + this.height >= other.pos.y &&
                this.pos.y + this.height <= other.pos.y + other.width) ||
                (this.pos.y >= other.pos.y &&
                this.pos.y <= other.pos.y + other.width)) &&
                ((this.pos.x + this.length >= other.pos.x &&
                this.pos.x + this.length <= other.pos.x + other.width) ||
                (this.pos.x >= other.pos.x &&
                this.pos.x <= other.pos.x + other.width))){
                  this.grounded = true;
                  this.vel.y = 0;
                  this.pos.y = other.pos.y - this.height;
                }
              }
      }
    }
  }
  isTouchingBottom(other){
    return (this.pos.y + this.height >= other.pos.y &&
            this.pos.y + this.height <= other.pos.y + other.width);

  }
}
