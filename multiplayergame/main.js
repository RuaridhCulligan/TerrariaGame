let player;
let w = 30;
let pH = 2 * w -2;
let pW = w-10;
let cols;
let rows;
let terrains = [];
let terrainIndex = 0;
let selectedPos = 0;
let crafting = false;

function setup(){
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / w);
  rows = floor(height / w);
  for (let i = 0; i < 10; i++){
    terrains.push(generateTerrain());
  }
}

function draw(){
  background(255);
  noStroke();
  if(crafting){
    craftStep();
  }else{
    worldStep();
  }
}

function worldStep(){
  if(player.pos.x <= 0){
    terrainIndex--;
    if(terrainIndex < 0){
      terrainIndex = terrains.length - 1;
    }
    player.pos.x = width - player.length - 5;
  }else if(player.pos.x >= width - player.length){
    terrainIndex++;
    if(terrainIndex >= terrains.length){
      terrainIndex = 0;
    }
    player.pos.x = 5;
  }

  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      terrains[terrainIndex][i][j].show();
    }
  }

  // for (let i =0; i < cols; i++){
  //   for (let j = 0; j < rows; j++){
  //     if (terrains[terrainIndex][i][j].type == "cloud"){
  //       if(i >= )
  //       terrains[terrainIndex][i][j].type = "air";
  //       terrains[terrainIndex][i + 1][j].type = "cloud";
  //       terrains[terrainIndex][i - 1][j + 1].type = "air";
  //       terrains[terrainIndex][i + 1][j + 1].type = "cloud";
  //
  //     }
  //   }
  // }

  player.update();
  player.show();

  displayInventory();
}

function craftStep(){
  fill(101);
  rect(width * 0.5 - 400, 100, 800, height - 200);
  displayInventory();
}

function keyPressed(){
  if(!crafting){
    checkPlayerPresses(key, keyCode);
  }else{

  }
}
function keyReleased(){
  if(!crafting){
    checkPlayerReleases(key, keyCode);
  }else{

  }
}

function checkPlayerPresses(key, keCode){
  if (key == 'a'){
    player.vel.x = -8;
    player.pos.x -=1;
  }else if (key == 'd'){
    player.vel.x = 8;;
  }else if (keyCode == 32 && player.grounded){
    player.pos.y = player.pos.y - w;
  }else if (key == 'c' || key == 'C'){
    crafting = !crafting;
  }

  if(keyCode == LEFT_ARROW && player.inventory.length > 0){
    selectedPos--;
    if(selectedPos < 0){
      selectedPos = player.inventory.length - 1;
    }
  }else if(keyCode == RIGHT_ARROW && player.inventory.length > 0){
    selectedPos++;
    if(selectedPos >= player.inventory.length){
      selectedPos = 0;
    }
  }
}

function chekPlayerReleases(key, keyCode){
  if (key == 'a'){
    player.acc.x =0;
    player.vel.x = 0;
  }else if (key == 'd'){
    player.acc.x =0;
    player.vel.x =0;
  }
}

function make2DArray(c, r){
  let arr = new Array(c);
  for (let i = 0; i < arr.length; i++){
    arr[i] = new Array(r);
  }
  return arr;
}

function mousePressed(){
  let found = false;
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      if(terrains[terrainIndex][i][j].isMouseClick() && terrains[terrainIndex][i][j].type == "air" && dist(player.pos.x, player.pos.y, terrains[terrainIndex][i][j].pos.x, terrains[terrainIndex][i][j].pos.y) < 4 * w && player.inventory.length > 0){
        terrains[terrainIndex][i][j].type = player.inventory[selectedPos].type;
        player.inventory[selectedPos].amount--;
        if(player.inventory[selectedPos].amount < 1){
          player.inventory.splice(selectedPos, 1);
          selectedPos--;
          if(selectedPos < 0){
            selectedPos = 0;
          }
        }
      }else if (terrains[terrainIndex][i][j].isMouseClick() && terrains[terrainIndex][i][j].type != "air" && player.inventory.length < 20 && dist(player.pos.x, player.pos.y, terrains[terrainIndex][i][j].pos.x, terrains[terrainIndex][i][j].pos.y) < 2 * w){
        found = false;
        for (let k = 0; k < player.inventory.length; k++){
          if (terrains[terrainIndex][i][j].type == player.inventory[k].type){
            if (player.inventory[k].amount < 10){
              player.inventory[k].amount++;
              found = true;
              break;
            }
          }
        }
        if (!found){
          player.inventory.push(new Item(terrains[terrainIndex][i][j].type));
        }
        terrains[terrainIndex][i][j].type = "air";
      }
    }
  }
}
function displayInventory(){
  fill(51);
  rect(width * 0.5 - 300, 40, 600, 30);
  for(let i = 0; i < player.inventory.length; i++){
    if(player.inventory[i].type == "grass"){
      fill('#006600');
    }else if (player.inventory[i].type == "dirt"){
      fill('#654321');
    }else if (player.inventory[i].type == "stone"){
      fill('#838383');
    }else if (player.inventory[i].type == "wood"){
      fill('#b5651d');
    }else if (player.inventory[i].type == "leaves"){
      fill('#316250');
    }
    rect(width * 0.5 - 296 + i * w, 45, 20, 20);
    fill(255);
    text(player.inventory[i].amount, width * 0.5 - 296 + i * w, 55);
  }
}

function generateTerrain(){
  let terrain = make2DArray(cols, rows);
  for (let i =0; i < cols;i++){
    for (let j = 0; j < rows; j++){
      terrain[i][j] = new Terrain(i * w, j*w, w);
      if (j < rows * 0.5+noise(i + terrains.length * cols)*5){
        terrain[i][j].type = "air";
      }else if (j >= rows * 0.5+noise(i + terrains.length * cols)*3 && j < rows *0.5 + noise(i + terrains.length * cols) *3 +3){
        if(player == null){
          player = new Player((i) *w + 5, j * w  - pH, pH, pW);
        }
        terrain[i][j].type = "grass";
      }else if (j >= rows *0.5 + noise(i + terrains.length * cols) *3 +3 && j < rows * 0.5 +noise(i + terrains.length * cols) *3+ 8){
        terrain[i][j].type = "dirt";
      }else if(j >= rows *0.5 +noise(i + terrains.length * cols) *4 + 8){
        terrain[i][j].type = "stone";
      }
    }
  }

  let trees = [];
  let treeIndex = 0;
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      if (random() < 0.2 && i < cols -3 && i > 0 && j >= rows * 0.5+noise(i)*3 && j < rows *0.5 + noise(i) *3 +1){
        if(trees.length > 0){
          if(trees[treeIndex - 1].i == i || trees[treeIndex - 1].i == i - 1){
            continue;
          }
        }
        if(terrain[i][j + 1].type == "air" || terrain[i - 1][j - 1].type == "grass" || terrain[i + 1][j - 1].type == "grass"){
          continue;
        }
        trees.push(new Tree(terrain, i, j));
        treeIndex ++;
      }
    }//never mind, the for loop is in the player class function too
  }
  let clouds = [];
  let cloudsIndex = 0;
  for (let i = 2; i < cols - 2; i++){
    for (let j = 2; j < rows * 0.25; j++){
      if (random() < 0.01){
        clouds.push(new Cloud(terrain, i, j));
      }
    }
  }

  return terrain;
}
