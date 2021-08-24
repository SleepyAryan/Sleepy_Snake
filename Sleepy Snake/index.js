let inpDir = {x:0, y:0};
const foodSound = new Audio('/music/food.mp3');
const gameOverSound = new Audio('/music/gameover.mp3');
const moveSound = new Audio('/music/move.mp3');
const musicSound = new Audio('/music/music.mp3');
let speed = 15;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
]
// musicSound.play();
let score=0;
food = {x:6, y:7};
function main(ctime){
    window.requestAnimationFrame(main); 
    // console.log(ctime); 
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    for(let i =1; i < snakeArr.length;i++) {
        if(snake[i].x===snake[0].x  && snake[i].y===snake[0].y){
            return true;
        }
    }
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0 )
        {
            return true;
        }
}

function gameEngine(){
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inpDir = {x:0, y:0};
        alert("Game Over Noobie...Press Any key to play again");
        snakeArr = [{x:13, y:15}];
        musicSound.play(); 
         score=0;
    }
    //increment snake and food random location
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score = score + 1;
        document.getElementById("score").innerHTML="Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x + inpDir.x, y: snakeArr[0].y + inpDir.y});
        let a= 2;
        let b= 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y:Math.round(a + (b-a)*Math.random())}
    }
  
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inpDir.x;
    snakeArr[0].y += inpDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
inputDir = {x: 0, y: 1};
moveSound.play();
musicSound.play();
switch (e.key) {
    case "ArrowUp":
        console.log("ArrowUp");
        inpDir.x=0;
        inpDir.y=-1;
        break;
    case "ArrowDown":
        console.log("ArrowDown");
        inpDir.x= 0;
        inpDir.y= 1;
        break;
    case "ArrowLeft":
        console.log("ArrowLeft");
        inpDir.x= -1;
        inpDir.y= 0;
        break;
    case "ArrowRight":
        console.log("ArrowRight");
        inpDir.x= 1;
        inpDir.y= 0;
        break;
    default:
        break;
}
});
