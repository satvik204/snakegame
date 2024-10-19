// declare variables
const board = document.querySelector(".board");
let inputDir = {x:0,y:0};
const foodSound = new Audio('./music/food.mp3');
const moveSound = new Audio('./music/move.mp3');
const gameover = new Audio('./music/gameover.mp3');
const musicSound = new Audio('./music/music.mp3');
let a,b;

let speed = prompt("Enter the speed of snake: 1-5(Easy) 5-10(Medium) 10-15(Hard) 15-20(Expert) 20-25(Impossible)");
speed =  Number(speed);
//checking speed input
if(speed !=1 && speed != 2 && speed !=3 && speed !=4 && speed !=5 && speed !=6 && speed !=7 && speed !=8 &&speed !=9 && speed !=10 && speed !=11 &&speed !=12 && speed !=13 && speed !=14 && speed !=15 && speed !=16 && speed !=17  && speed !=18  && speed !=19  && speed !=20  && speed !=21  && speed !=22  && speed !=23  && speed !=24 && speed !=25 ){
    alert("Enter speed in range 1 - 15");
    location.reload();
}
else{
    let difficulty = prompt("Enter the difficulty level: 1(Easy) 2(Medium) 3(Hard)");
    difficulty = Number(difficulty);
    //checking difficulty input
    if(difficulty== 1){
         a = 3;
         b = 16;
    }else if(difficulty==2){
         a = 2;
         b = 17;
    }
    else if(difficulty==3){
         a = 1;
         b = 18;
    }
    else{
    alert("Enter number in range(1-3)");
    location.reload();
    }
    
}
console.log(typeof(speed));


let hiscoreval;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [{x:13, y:15}]
const scorer = document.querySelector(".score");
const hiscorer = document.querySelector(".Hi-score");
let arrowLeft = document.querySelector(".left");
let arrowBottom = document.querySelector(".bottom");
let ArrowTop = document.querySelector(".top");
let ArrowRight = document.querySelector(".right");
food = {x:6 , y:7};

//Game Functions

//check speed input


//run game loop
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime-lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

//snake collide function 

function isCollide(snake) {
   for (let i = 1; i < snakeArr.length; i++) {
    if(snake[i].x === snakeArr[0].x && snake[i].y === snakeArr[0].y){ 
        if (score > localStorage.getItem("hiscore")) {
            localStorage.setItem("hiscore",String(score));
        }
        score = 0;
        
        scorer.innerHTML = score;
        return true;
        
   }
   if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0 ){
    if (score > localStorage.getItem("hiscore")) {
        localStorage.setItem("hiscore",String(score));
    }
    score = 0;
    
    scorer.innerHTML = score;
    return true;
   }

}

return false;
}

function gameEngine() {
    // Updating snake variable and food
        musicSound.play();
    if (isCollide(snakeArr)) {
        gameover.play();
        musicSound.pause();
        inputDir ={x:0,y:0};
        alert("Game over! press any key to play again");
        location.reload();
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
    }

    // food eaten code 

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
         snakeArr.unshift({x: snakeArr[0].x+inputDir.x , y: snakeArr[0].y + inputDir.y});
         foodSound.play();
         score+=1;
         scorer.innerHTML = score;         
      console.log(a,b);
      
         food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }
     
    //Moving snake

    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1]={...snakeArr[i]};

    }
        
    
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // Display the snake and food

    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((element,index) => {
       snakelement = document.createElement("div");
       snakelement.style.gridRowStart = element.y;
       snakelement.style.gridColumnStart = element.x;
       if (index === 0) {
        snakelement.classList.add("head");
       }else{
       snakelement.classList.add("snake");

       }
       board.appendChild(snakelement);
    })

    //Display the food

    snakeArr.forEach((element,index) => {
        foodelement = document.createElement("div");
        foodelement.style.gridRowStart = food.y;
        foodelement.style.gridColumnStart = food.x;
        foodelement.classList.add("food");
        board.appendChild(foodelement);
     })
}
// game logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore","0"); 
}
else{
    hiscoreval = JSON.parse(localStorage.getItem("hiscore"))
    hiscorer.innerHTML = hiscoreval; 

}
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e) => {
    moveSound.play();
         inputDir = {x:0, y:1};  // Start Game 
  
        switch (e.key) {
            case "ArrowUp":
               inputDir.x = 0;
               inputDir.y = -1;
                break;
            
            case "ArrowDown":
                inputDir.x = 0;
               inputDir.y = 1;
                break;
        
            case "ArrowLeft":
               inputDir.x = -1;
               inputDir.y = 0;
               break;
        
            case "ArrowRight":
                inputDir.x = 1;
               inputDir.y = 0;
                break;
        
            default:
                break;
        }

    
})

ArrowRight.addEventListener('click',()=>{
    inputDir.x = 1;
               inputDir.y = 0;  
})


arrowLeft.addEventListener('click',()=>{
    inputDir.x = -1;
               inputDir.y = 0;  
})


arrowBottom.addEventListener('click',()=>{
    inputDir.x = 0;
               inputDir.y = 1;  
})


ArrowTop.addEventListener('click',()=>{
    inputDir.x =0;
               inputDir.y = -1;  
})