var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var obstacleGroup,bananaGroup;
var survivaltime=0,  ground
var PLAY = 1;
var END = 0;
var gameState = PLAY;
        
function preload() {
  
  monkey_moving = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png",  "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png",  "sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(500, 350);
  
  ground = createSprite(450, 350, 900, 10);
  ground.velocityX = -4;
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_moving);
  monkey.scale = 0.1;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  background(255);
  
  if (ground.x < 0) {
    ground.x = ground.width / 2
  }

  if (gameState === PLAY) {

    if (keyDown("space") && monkey.y > 200) {
      monkey.velocityY = -10;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    
    createBananas();
    createObstacles();
    
    if (monkey.isTouching(obstacleGroup))
    {gameState = END;}
   
    survivaltime=Math.ceil(frameCount/frameRate())
} 
  
  else if (gameState === END) {

    ground.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
}
  
  monkey.collide(ground);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:" + survivaltime, 170, 20);
  
  drawSprites();
}

function createBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, Math.round(random(120, 200)), 20, 20);
    banana.velocityX = -4;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 200;
    bananaGroup.add(banana);
    monkey.depth = banana.depth + 1;
  }
}

function createObstacles() {

  if (frameCount % 200 === 0) {
    obstacle = createSprite(600, 328, 20, 20);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}