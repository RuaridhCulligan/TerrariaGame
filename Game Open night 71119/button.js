class Button{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.w = 20;
    this.itemType;
  }

  show(){
    fill(255);
    rect(this.pos.x, this.pos.y, this.w, this.w);
    if(this.itemType == "grass"){
      fill('#006600');
    }else if (this.itemType == "dirt"){
      fill('#654321');
    }else if (this.itemType == "stone"){
      fill('#838383');
    }else if (this.itemType == "wood"){
      fill('#b5651d');
    }else if (this.itemType == "leaves"){
      fill('#316250');
    }
    if(this.itemType != null){
      rect(this.pos.x + 2, this.pos.y + 2, this.w - 4, this.w - 4);
    }
  }

  isMouseClick(){
    if (mouseX > this.pos.x && mouseX < this.pos.x + this.w &&
        mouseY > this.pos.y && mouseY < this.pos.y + this.w){
      return true;
    }else{
      return false;
    }

  }
}
