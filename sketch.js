let ground;
let lander, landerGroup;
var lander_img;
var bg_img;
var invisGround
var gameState = "Start"

var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  lander = createSprite(random(50,900),50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.debug = true
  lander.setCollider("rectangle", 40,40,600,600)
  lander.lifetime = 200
  landerGroup = new Group()
  lander.visible = false

  invisGround = createSprite(500,600,300,30);
  //invisGround.visible = false
  invisGround.debug = true

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  pop();
  invisGround.x = mouseX
  spawnLander()
  
  if(lander.isTouching(invisGround) === true){
    lander.collide(invisGround)
    lander.destroy()
    g = 0.05
    vy = 0
  }

  //fall down
  vy +=g;
  lander.position.y+=vy;
  drawSprites();
  if(keyCode === 32){
    lander.y -= 10
  }

}

function spawnLander(){
  if(frameCount % 60 === 0){
    lander = createSprite(random(50,900),50,30,30);
    lander.addImage(lander_img);
    lander.scale = 0.1;
    lander.debug = true
    lander.visible = true
    lander.setCollider("rectangle", 40,40,600,600)
    lander.lifetime = 200
    landerGroup.add(lander)
    landerGroup.setVelocityYEach(28)
    console.log(lander.depth)
  }
}

