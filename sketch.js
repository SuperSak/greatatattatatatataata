var database, game, form, player;
var gameState=0;
var playerCount=0;
var allPlayers
var cars, car1,car2,car3,car4,car1Image,car2Image,car3Image,car4Image,track,trackImage;
function preload(){
    car1Image=loadImage("images/car1.png")
    car2Image=loadImage("images/car2.png")
    car3Image=loadImage("images/car3.png")
    car4Image=loadImage("images/car4.png")
    trackImage=loadImage("images/track.jpg")
}
function setup(){
    database=firebase.database()
    createCanvas(displayWidth-30,displayHeight-100);
    game=new Game()
    game.getState()
    game.start()
}
function draw(){
    if(gameState===1){
        clear();
        game.play()
    }
    if(playerCount===4){
        game.update(1);
    }
    if(gameState===2){
        game.end()
    }
}