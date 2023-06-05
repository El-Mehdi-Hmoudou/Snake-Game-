const board = document.querySelector(".board")
const cadre = document.querySelector(".cadre")
const score = document.querySelector(".score")
const level = document.querySelector(".level")
const speed = document.querySelector(".speed")

let foodX, foodY
let snake = { X: 23, Y: 18 }
let directionX = 0, directionY = 0
let snakeBody = []
let gameover = false
let scoreE = 0 
let levelE = 1
let lastRenderTime = 0
let snakeSpeed = 10

// change a food position random
function changeFoodPosition() {
    foodX = Math.floor(Math.random() * 45) + 1
    foodY = Math.floor(Math.random() * 35) + 1
}

// let snake moving
function moveSnake(e) {
    if (e.key === 'ArrowUp' && directionY != 1) {
        directionX = 0
        directionY = -1
    } else if (e.key === 'ArrowDown' && directionY != -1) {
        directionX = 0
        directionY = 1
    } else if (e.key === 'ArrowLeft' && directionX != 1) {
        directionX = -1
        directionY = 0
    } else if (e.key === 'ArrowRight' && directionX != -1) {
        directionX = 1
        directionY = 0
    }
    
    GameAll()
}

function myFunction() {
    // clearInterval(setInterval(GameAll , 300))
    location.reload()
}


// show the errour if snake out of wall
function gameOver() {     
    cadre.innerHTML += `
    <div class="over" id="over">
        <h1>you lost click to restart</h1>
        <button onclick="myFunction()"  id="btn">RESTART</button>
    </div>    
    `
} 




function GameAll(currentTime) {
     window.requestAnimationFrame(GameAll)
     const secondsSinceLastRender = (currentTime - lastRenderTime) /1000
     if (secondsSinceLastRender < 1 / snakeSpeed) return // more expline
        lastRenderTime = currentTime

    if (gameover) return gameOver()
    
    let htmlMark = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    // change food position whene snake eat it 
    if (snake.X == foodX && snake.Y == foodY) {
        changeFoodPosition()
        snakeBody.push([foodX , foodY])
        scoreE++
         
    }

    score.innerText = `score : ${scoreE}`
    level.innerText = `level : ${levelE}`
    speed.innerText = `speed : ${snakeSpeed}`

    // u = scoreE

    // for (let u = 0; u < 100; u+10) {
        
    // }
  

    // this function for let every segment of snake body move to the next segment for the end 
    for (let i = snakeBody.length - 1 ; i > 0 ; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }

    // snake out of waallll
    if (snake.X <= 0 || snake.X > 46 || snake.Y <= 0 || snake.Y > 36  ) {
        gameover = true 
    }




    snake.X += directionX
    snake.Y += directionY
    
    snakeBody[0] = [snake.X , snake.Y]

    // add a segment a snake body whene eat food
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMark += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0] ) {
            gameover = true
        }

    }

switch(scoreE) {
    case 10:
    levelE = 2
    snakeSpeed = 15
      break;
    case 17:
    levelE = 3
    snakeSpeed = 20
    break;
    case 29:
    levelE = 4
    snakeSpeed = 25
      break;
    case 31:
    levelE = 5
    snakeSpeed = 30
      break;
    case 40:
    snakeSpeed = 35
    levelE = "last level"
      break;          

  }    
    
    board.innerHTML = htmlMark


}





changeFoodPosition()
// setInterval(GameAll , 200)
document.addEventListener("keydown", moveSnake)
window.requestAnimationFrame(GameAll)
