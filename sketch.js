
var monkey , monkey_running;
var bananaImage, obstacleImage;
var FoodGroup, ObstacleGroup;
var score, ground;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_stopped= loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(500,400);
  monkey=createSprite(40,345,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addImage("stopped", monkey_stopped);
  monkey.scale=0.15;
  ground=createSprite(40,380,100,20);
  ground.visible=false;
  FoodGroup=createGroup();
  ObstacleGroup=createGroup();
  score=0;
  monkey.setCollider("circle",0,0,100);
  monkey.debug = true;
  
}


function draw() {
  background("turquoise");
  text("Score:"+score,450,10);
  if(gameState===PLAY){
  if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -20;
      
    }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  SpawnBananas();
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+2;
  }
    SpawnObstacles();
  if(ObstacleGroup.isTouching(monkey)){
    gameState=END;
  }
  }
  else if (gameState===END){
    text("Game Over",200,190)
    text("Press R to restart", 200,210)
    FoodGroup.setLifetimeEach(-1);
    ObstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    ObstacleGroup.setLifetimeEach(-1);
    monkey.changeImage("stopped",monkey_stopped);
    monkey.velocityY=0;
    if(keyWentDown("r")){
      reset();
    }
  }
  
  drawSprites();
}

function SpawnBananas(){
  if (frameCount % 150 === 0) {
    var banana = createSprite(500,130,40,10);
    banana.y = Math.round(random(250,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    if(score%2==0&&score>=10){
      banana.velocityX=banana.velocityX+0.5;
    }
    
    //assign lifetime to the variable
    banana.lifetime = 125;
    FoodGroup.add(banana);
  }
}
function SpawnObstacles(){
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(500,395,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.velocityX = -4;
    if(score%2==0&&score>=10){
      obstacle.velocityX=obstacle.velocityX+0.5;
    }
    
    //assign lifetime to the variable
    obstacle.lifetime = 125;
    ObstacleGroup.add(obstacle);
  }
}
function reset(){
  gameState=PLAY;
  monkey.changeAnimation("running", monkey_running)
  score=0;
  ObstacleGroup.destroyEach();
  FoodGroup.destroyEach();
}




