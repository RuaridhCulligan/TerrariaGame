class Terrain{
  constructor(x, y, w){
    //this.pos = createVector(x, y);
    this.pos = createVector(x, y);
    this.type;
    this.broken = false;
    this.width = w;
    this.isSolid = true;
  }

  show(){
    if (!this.broken){
      if(this.type == "grass"){

        fill('#006600');
      }else if (this.type == "dirt"){
        fill('#654321');
      }else if (this.type == "air"){
        fill('#3095D3');
      }else if (this.type == "stone"){
        fill('#838383');
      }else if (this.type == "wood"){
        fill('#b5651d');
      }else if (this.type == "leaves"){
        fill('#316250');
      }else if (this.type == "cloud"){
        fill('#FFFFFF');
      }
      rect(this.pos.x, this.pos.y, this.width, this.width);
    }

  }
  cloudUpdate(){
    this.pos.x+= 2;
  }
  isMouseClick(){
    if (mouseX >= this.pos.x && mouseX <= this.pos.x + this.width && mouseY >= this.pos.y && mouseY <= this.pos.y + this.width){
      return true;
    }else{
      return false;
    }

  }

}
