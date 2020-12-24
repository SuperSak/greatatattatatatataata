class Game{
    constructor(){

    }
    getState(){
        var gameStateRef=database.ref("gameState");
        gameStateRef.on("value",function(data){
            gameState=data.val()
        })
    }
    //there is a terrible error on line 14
    update(state){
        database.ref('/').update({
          gameState: state
        });
      }
    
   async start(){
        if(gameState===0){
            player=new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists){
                player.getCount();
            }
          
            form=new Form();
            form.display()
        }
        car1=createSprite((displayWidth-30)/5,200)
        car2=createSprite((displayWidth-30)*2/5,200)
        car3=createSprite((displayWidth-30)*3/5,200)
        car4=createSprite((displayWidth-30)*4/5,200)
        car1.addImage(car1Image)
        car2.addImage(car2Image)
        car3.addImage(car3Image)
        car4.addImage(car4Image)
        cars=[car1,car2,car3,car4]

    }
    play(){
        form.hide()
        //text("Game Start!",130,200)
        Player.getPlayerInfo();
        player.getCarsAtEnd();
        if(allPlayers!==undefined){
            background("brown")
            image(trackImage,0,(displayHeight-100)*-4,displayWidth-30,(displayHeight-100)*5)
            /**var displayPosition=90
            displayPosition+=30**/
            //index of the array
            var index=0;
            var x=0
            var y
            // initialize the variable, condition., increament
            for(var plr in allPlayers){
                // add 1 to the index for every loop
                index++
                //increament the x position for every car
                x += (displayWidth-30)/5

                // use database for the y position
                y=displayHeight-allPlayers[plr].distance
                cars[index-1].x=x
                cars[index-1].y=y
                
                if(index===player.index){
                    cars[index-1].shapeColor=rgb(255,55,0)
                    strokeWeight(50)
                    stroke("red")
                    fill("red")
                    ellipse(x,y,50,50)
                    camera.position.x=(displayWidth-30)/2
                    camera.position.y=cars[index-1].y
                }
                
            };
           
        }
        if(keyIsDown(UP_ARROW)&&player.index!==null){
            player.distance += 50
            player.update()
        }
        if(player.distance>(displayHeight-30)*5){
            gameState=2;
            player.rank += 1
            Player.updateCarsAtEnd(player.rank)
            console.log("Your rank is " + player.rank)
        }
        drawSprites();
    }
    end(){
        console.log("The Game Has Ended")
    }
}
