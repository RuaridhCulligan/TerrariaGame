class Tree{
  constructor(terrain, i, j){
    this.i = i;
    this.j = j;
    terrain[i    ][j    ].type = "wood";
    terrain[i    ][j - 1].type = "wood";
    terrain[i    ][j - 2].type = "wood";
    terrain[i + 1][j - 2].type = "leaves";
    terrain[i - 1][j - 2].type = "leaves";
    terrain[i    ][j - 3].type = "leaves";
  }

}
