
const cvs = document.getElementById('snake');
const ctx = cvs.getContext("2d");

//creating the unit
const box = 32;

//load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//initialising the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
}


//init food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

//init the score
let score = 0;

//control the snake

let d;
document.addEventListener("keydown", direction);
function direction(event){
    if (event.keyCode == 37 && d!= "RIGHT"){
        d = "LEFT";
    }else if(event.keyCode == 38 && d!= "DOWN"){
        d = "UP";
    }else if(event.keyCode == 39 && d!= "LEFT"){
        d = "RIGHT";
    }else if(event.keyCode == 40 && d!= "DOWN"){
        d = "DOWN";
    }
}

//control collision logic



//draw on canvas

function draw (){
    ctx.drawImage(ground, 0, 0);

    for(let i = 0; i < snake.length ; i++){
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);
    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;



    //adjust direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    //food logic when snake eats apple
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        //we don't remove the tail
    }else{
            //remove the tail
            snake.pop();
    }

    // game over rules
    if (snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
    }


    //add new head
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Change one";
    ctx.fillText(score, 2*box, 1.6*box);

}

//calling draw function
let game = setInterval(draw, 100);

