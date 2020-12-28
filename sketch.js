var gameState="play";
var tower, towerImage;
var door, doorGroup, doorImage;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var invisible, invisibleGroup;
var sound;


function preload (){
  
  towerImage = loadImage("tower.png");
  
  doorImage = loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
  ghostImage = loadImage("ghost-jumping.png");
  
  sound = loadSound("spooky.wav");
  
}


function setup (){
  
  createCanvas(600,600);
  sound.loop();
  
  //creating tower
  tower= createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = 2;
  
  //creting all new groups
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
  
  //creating ghost
  ghost= createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale= 0.5;
  
}


function draw() {
  
  background(0);
  
  //creating gameState Play
  if (gameState=="play"){
    
  if (tower.y > 400) {
      tower.y = 300;
    
    }
  
    //moving the ghost keys
  if (keyDown("right_arrow")) {
      ghost.x= ghost.x+3;
    
      }
  
   if (keyDown("left_arrow")) {
      ghost.x= ghost.x-3;
    
      }
  
   if (keyDown("up_arrow")) {
      ghost.velocityY=-5;
      }
  
 ghost.velocityY= ghost.velocityY+0.8;
  
    
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
    //destroying the ghost
  if (invisibleGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  
  
  spawnDoor();
  
  
  drawSprites();
  }
  
  //creating gameState End
  if (gameState=="end"){
    textSize(50);
    fill("red");
    stroke("lightblue");
    text("Game Over",200,300);
    
  }
  
}

//spawnDoor code
function spawnDoor() {
  
  if (frameCount%240==0) {
    
    //creating door
    door = createSprite (200,-50);
    door.addImage("door",doorImage);
    
    //creating climber
    climber = createSprite(200,10);
    climber.addImage("climber",climberImage);
    
    //creating invisible ground
    invisible = createSprite(200,15);
    invisible.width = climber.width;
    invisible.height = 2;
    
    //math.round using
    door.x = Math.round(random(120,400));
    door.velocityY = 2;
    
    climber.x = door.x;
    climber.velocityY = door.velocityY;
    climber.lifetime = 400;
    
    invisible.x = door.x;
    invisible.velocityY = door.velocityY;
    invisible.debug = true;
    
    //adding depth
    ghost.depth= climber.depth+door.depth+1;
    
    door.lifetime = 400;
    
    //adding all to there groups
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleGroup.add(invisible);
      }
  
  
}



















