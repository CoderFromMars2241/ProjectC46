var player
var road
var life1
var life2
var life3
var life = 3
var regainLife
var thirst
var water
var obstacle1
var track
var score = 0
var obstacleGroup
var PLAY = 1
var END = 0
var gameState = PLAY
var crash
var bg
var box
var waterBar
var waterBar2
var waterIcon

function preload(){

    playerImg = loadAnimation("./assets/Runner-1.png","./assets/Runner-2.png");
    roadImg = loadImage("./assets/path.png");
    lifeImg = loadImage("./assets/heart.png");
    waterImg = loadImage("./assets/waterDrop.png");
    coinImg = loadImage("./assets/coin.png");
    obstacleImg = loadImage("./assets/obstacle1.png");
    crash = loadSound("./assets/oof.mp3");
    drink = loadImage("./assets/drink.png")
    bg = loadSound("./assets/bg.mp3");
}

function setup(){
   canvas = createCanvas(700, 645);

    track = createSprite(400,150,500,1850)
    track.addImage(roadImg)
    track.scale = 1.5;
    track.velocityY = +4

    life1 = createSprite(40,100,20,20);
    life1.addImage(lifeImg);
    life1.scale = 0.2

    life2 = createSprite(90,100,20,20);
    life2.addImage(lifeImg);
    life2.scale = 0.2

    life3 = createSprite(140,100,20,20);
    life3.addImage(lifeImg);
    life3.scale = 0.2

    player = createSprite(400,500,20,20)
    player.addAnimation("player",playerImg);
    player.scale = 0.08

    waterBar2 = createSprite(75,140,125,20);
    waterBar = createSprite(75,140,125,20);
    waterIcon = createSprite(150,140,20,20)
    waterIcon.addImage(waterImg)
    waterIcon.scale = 0.1
    
    

   obstacleGroup = new Group();
   heart = new Group();

   player.setCollider("circle",0,0,350);
   player.debug = true
    bg.play()
    bg.loop()
    bg.setVolume(0.1)
}



function draw(){
    background("black")

    stroke("yellow")
    fill("red")
    textSize(25)
    text("Score: "+ score, 20,50);

    noStroke();
    fill("white")
    textSize(12)
    text("Backspace to Mute Music" ,20,185);
    
    
    
    if(gameState === PLAY){
        score = score + Math.round(getFrameRate()/60);
        
        if(track.y > 400){
            track.y = height/2;
        }



        if(life===3){
            life1.visible = true
            life2.visible = true
            life3.visible = true
          }
          if(life===2){
            life1.visible = false
            life2.visible = true
            life3.visible = true
          }
          if(life===1){
            life1.visible = false
            life2.visible = false
            life3.visible = true
          }

        if(keyDown(LEFT_ARROW)){
            player.x -= 5
        }

        if(keyDown(RIGHT_ARROW)){
            player.x += 5
        }
        
      if(bg.isPlaying()){
        if(keyDown(BACKSPACE)){
            mute();
        }
      } 
        
        if(obstacleGroup.isTouching(player)){
            crash.play()
            life=life-1
            player.x = player.x + 150
         }

         if(heart.isTouching(player)){
            
            life=life +1
            heart.destroyEach()
         }
         
        obstacles();
        health();
        showWaterBar();
        drawSprites()
        

        if(life===0){
            gameState = END
        }
    }
   else if(gameState === END){
    track.velocityY = 0
    obstacleGroup.setVelocityYEach(0);
    obstacleGroup.destroyEach();
    heart.setVelocityYEach(0);
    heart.destroyEach()
    textSize(30)
    fill ("red")
    text("Game Over! Your score: "+ score, 140, 320)
    bg.setVolume(0)
   }


    
    edges = createEdgeSprites();
    player.collide(edges);
   
   
}

function obstacles(){
    if(frameCount%120===0){
        obstacle1 = createSprite(random(250,400),1,20,20)
        obstacle1.addImage(obstacleImg)
        obstacle1.scale = 0.4
        obstacle1.velocityY = 5
        obstacleGroup.add(obstacle1)

    }
}

function health(){
    if(frameCount%120===0){
        regainLife = createSprite(random(200,500),1,20,20)
        regainLife.addImage(lifeImg)
        regainLife.scale = 0.1
        regainLife.velocityY = 5
        heart.add(regainLife)
    }
}

function mute(){
  if(bg.isPlaying())
     {
      bg.setVolume(0);
     }
     else{
      bg.play();
     }
}

 function  showWaterBar() {
   
    
   
    /* push();
    image(waterImg,150,140,20,20);
    fill("white");
    rect(20,140,125,20);
    fill("#92DFF3");
    rect(20,140,125,20);
    noStroke();
    pop();*/
  }
