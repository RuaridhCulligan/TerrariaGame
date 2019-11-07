class Cloud {
  constructor(terrain, i, j){
    this.i = i;
    this.j = j;
    terrain[i][j].type = "cloud";
    terrain[i + 1][j].type = "cloud";
    terrain[i + 2][j].type = "cloud";
    terrain[i + 1][j - 1].type = "cloud";
  }
  update(){
    this.i++;
  }
}
