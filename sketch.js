var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;


//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();
  foodObj.getFedTime();
  


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedFood = createButton("Feed the dog");
  feedFood.position(700,95);
  feedFood.mousePressed(feedDog)


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();


  let h = hour();
  
  

  //write code to read fedtime value from the database 
  if(h>=12){
    //show time in PM format when h is greater than 12
    text("Last Feed : "+h,"PM",350,30);
  }else if(h==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+h,"AM",350,30);
  }

  
  //write code to display text lastFed time here


 
  drawSprites();

  
}
 
//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS--;
  database.ref('/').update({
    Food : foodS
  })
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


