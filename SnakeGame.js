 //variable declarations and intilizations
 const eat = new Audio('food.mp3');
 const gameOver = new Audio('gameover.mp3');
 const move = new Audio('move.mp3');
 let inputDir = { x: 0, y: 0 };
 let gamebox = document.querySelector(".gamebox");
 let score1 = document.querySelector(".score");
 let HighScore = document.querySelector(".high-score");
 let buttons = document.querySelectorAll(".btn");
 let lastPaintTime = 0;
 let speed = 5;
 let snakeBody = [{ x: 15, y: 18 }];
 food = { x: 10, y: 6 }
 let score = 0;

// storing score in local storage
let highscore = localStorage.getItem("high-score");

 //game Functions

 function main(ctime) {
     window.requestAnimationFrame(main);
     if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
         return;
     }
     lastPaintTime = ctime;
     gameLogic();
 }

 function gameLogic() {
     updatingSnakeBody();
     displayObjects();
 }

 // collide logic
 function isCollide(snake) {
     //if snake is collided with its body
     for (let i = 1; i < snakeBody.length; i++) {
         if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
             return true;
         }
     }
     // if snake is collided with the walls of the container
     if (snake[0].x >= 30 || snake[0].x <= 0 || snake[0].y >= 30 || snake[0].y <= 0) {
         return true;
     }
 }

 //function for updating SnakeBody

 function updatingSnakeBody() {
     if (isCollide(snakeBody)) {
         inputDir = { x: 0, y: 0 };
         gameOver.play();
         alert("Game Over ! Please press any key to play again.");
         snakeBody = [{ x: 15, y: 18 }];
         score = 0;
         score1.innerHTML = `Score:` + score;
     }
     // if food is eaten, Adding body elements to snake head and incrementing the score
     if (snakeBody[0].y === food.y && snakeBody[0].x === food.x) {
         score += 1;
         score1.innerHTML = `Score: ${score}`;
         snakeBody.unshift({ x: snakeBody[0].x + inputDir.x, y: snakeBody[0].y + inputDir.y });
         highscore = score >= highscore ? score : highscore;
         localStorage.setItem("high-score",highscore);
         HighScore.innerHTML = `High Score : ${highscore}`;
         eat.play();
         let a = 5;
         let b = 28;
         food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
     }
     // making the Snake to move
     for (let i = snakeBody.length - 2; i >= 0; i--) {
         snakeBody[i + 1] = { ...snakeBody[i] };

     }
     snakeBody[0].x += inputDir.x;
     snakeBody[0].y += inputDir.y;
 }

 // Function for Displaying snake And Food

 function displayObjects() {
     gamebox.innerHTML = "";
     snakeBody.forEach((e, index) => {
         snakeElement = document.createElement("div");
         snakeElement.style.gridRowStart = e.y;
         snakeElement.style.gridColumnStart = e.x;
         if (index === 0) {
             snakeElement.classList.add("snakehead");
         }
         else {
             snakeElement.classList.add("snakebody");
         }
         gamebox.appendChild(snakeElement);
     })

     foodElement = document.createElement("div");
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add("food");
     gamebox.appendChild(foodElement);

 }



 // main logic

 window.requestAnimationFrame(main);
 window.addEventListener("keydown", e => {
     inputDir = { x: 0, y: 1 }
     move.play();
     switch (e.key) {
         case "ArrowUp" :
             console.log("arrowUp");
             inputDir.x = 0;
             inputDir.y = -1;
             break;
         case "ArrowDown" :
             console.log("arrowDown");
             inputDir.x = 0;
             inputDir.y = 1;
             break;
         case "ArrowLeft" :
             console.log("arrowLeft");
             inputDir.x = -1;
             inputDir.y = 0;
             break;
         case "ArrowRight" :
             console.log("arrowRight");
             inputDir.x = 1;
             inputDir.y = 0;
             break;

         default:
             break;
     }
 })

// Function to handle button clicks
function handleButtonClick(e) {
    const direction = e.target.id;
    move.play();
    
    switch (direction) {
        case "u":
            console.log("arrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "d":
            console.log("arrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "l":
            console.log("arrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "r":
            console.log("arrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
}

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
