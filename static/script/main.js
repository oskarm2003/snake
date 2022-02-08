let z = Math.floor(Math.random() * 4)
const type = ["snake1", "snake2", "snake3", "snake4"]

const snake = {
    len: 3,
    direction: "right",
    mv: null,
    previousMv: "right",
}

const settings = {
    height: 20,
    width: 20,
    apple: `<img id="apple" src="images/apple.svg"></img>`,
    head: `<img class="snake" id="head" src="images/${type[z]}/head.svg"></img>`,
    body: `<img class="body" id="body" src="images/${type[z]}/body.svg"></img>`,
    tail: `<img class="snake" id="tail" src="images/${type[z]}/tail.svg"></img>`,
    turn: `<img class="snake" id="turn" src="images/${type[z]}/curve.svg"></img>`
}

const positions = [
    {
        x: null,
        y: null
    },
    // apple position ^
    {
        x: null,
        y: null
    },
    // head position ^
    {
        x: null,
        y: null
    }
    // mouse position ^
]

let gameArray = [[]]

let first = 1

let mouseMove

function createGameboard() {
    let gameboard = document.createElement("div")
    gameboard.id = "gameboard"
    gameboard.addEventListener("contextmenu", e => e.preventDefault())
    for (let i = 0; i < settings.height; i++) {
        gameArray[i] = []
        for (let j = 0; j < settings.width; j++) {
            gameArray[i][j] = 0
            let dv = document.createElement("div")
            dv.id = `${i}.${j}`
            dv.classList.add("field")
            if ((i + j) % 2 == 0) {
                dv.style.backgroundColor = "#719170"
            }
            else {
                dv.style.backgroundColor = "#84b382"
            }
            gameboard.append(dv)
        }
    }
    gameboard.style.width = settings.width * 50 + "px"
    document.body.append(gameboard)
}

function randomApple() {
    let pass = 0
    let x, y
    while (pass == 0) {
        x = Math.floor(Math.random() * settings.width)
        y = Math.floor(Math.random() * settings.height)
        if (gameArray[x][y] == 0) {
            pass = 1
            gameArray[x][y] = -1
        }
    }
    document.getElementById(`${x}.${y}`).innerHTML = settings.apple
    positions[0].x = document.getElementById("apple").offsetLeft
    positions[0].y = document.getElementById("apple").offsetTop
}

function eatApple() {
    snake.len += 1
    document.getElementById("score").innerText = `Snake Length: ${snake.len}`
    document.getElementById("apple").style.width = "50%"
    document.getElementById("apple").style.height = "50%"
    document.getElementById("apple").style.top = "25%"
    document.getElementById("apple").style.left = "25%"
    setTimeout(() => {
        // document.getElementById("apple").remove()
        randomApple()
    }, 200)
}

function mouse() {
    let pass = 0
    let x, y
    let mouse = document.createElement("img")
    mouse.id = "mouse"
    mouse.setAttribute("src", "images/mouse.svg")
    document.getElementById("gameboard").append(mouse)
    mouseMove = setInterval(() => {
        while (pass == 0) {
            x = Math.floor(Math.random() * settings.width) - 1
            y = Math.floor(Math.random() * settings.height) - 1
            if (gameArray[x][y] == 0) {
                pass = 1
            }
        }
        document.getElementById("mouse").style.left = x * 50 + "px"
        document.getElementById("mouse").style.top = y * 50 + "px"
        positions[2].x = document.getElementById("mouse").offsetLeft
        positions[2].y = document.getElementById("mouse").offsetTop
    }, 2000)
    setTimeout(() => {
        clearInterval(mouseMove)
        document.getElementById("mouse").remove()
    }, 10000)

}

function start() {
    let score = document.createElement("p")
    score.id = "score"
    score.innerText = `Snake Length: ${snake.len}`
    document.body.append(score)
    gameArray[Math.floor(settings.width / 2)][Math.floor(settings.height / 2)] = 1
    gameArray[Math.floor(settings.width / 2)][Math.floor(settings.height / 2) - 1] = 2
    gameArray[Math.floor(settings.width / 2)][Math.floor(settings.height / 2) - 2] = 3
    document.getElementById(`${Math.floor(settings.width / 2)}.${Math.floor(settings.height / 2)}`).innerHTML = settings.head
    document.getElementById(`${Math.floor(settings.width / 2)}.${Math.floor(settings.height / 2) - 1}`).innerHTML = settings.body
    document.getElementById(`${Math.floor(settings.width / 2)}.${Math.floor(settings.height / 2) - 2}`).innerHTML = settings.tail
}

function move(x, y) {
    snake.mv = setInterval(() => {
        for (let i = 0; i < settings.height; i++) {
            for (let j = 0; j < settings.width; j++) {
                if (gameArray[i][j] > 0) {
                    gameArray[i][j] += 1
                }
                if (gameArray[i][j] > snake.len) {
                    gameArray[i][j] = 0
                    document.getElementById(`${i}.${j}`).innerHTML = ""
                }
            }
        }
        if (snake.direction == "right") {
            y += 1
        }
        if (snake.direction == "left") {
            y -= 1
        }
        if (snake.direction == "up") {
            x -= 1
        }
        if (snake.direction == "down") {
            x += 1
        }
        if (gameArray?.[x]?.[y] > 0 || x < 0 || x > settings.width - 1 || y < 0 || y > settings.height - 1) {
            clearInterval(snake.mv)
            alert("koniec :cc")
            return (0)
        }
        if (gameArray[x][y] == -1) {
            eatApple()
        }
        gameArray[x][y] = 1
        for (let i = 0; i < settings.height; i++) {
            for (let j = 0; j < settings.width; j++) {
                if (gameArray[i][j] == 1) {
                    document.getElementById(`${i}.${j}`).innerHTML += settings.head
                    document.getElementById("head").style.left = j * 50 + "px"
                    if (snake.direction == "right") {
                        document.getElementById("head").style.transform = "rotate(0deg)"
                    }
                    if (snake.direction == "left") {
                        document.getElementById("head").style.transform = "rotate(180deg)"
                    }
                    if (snake.direction == "up") {
                        document.getElementById("head").style.transform = "rotate(-90deg)"
                    }
                    if (snake.direction == "down") {
                        document.getElementById("head").style.transform = "rotate(90deg)"
                    }
                }
                if (gameArray[i][j] == 2) {
                    document.getElementById(`${i}.${j}`).innerHTML = settings.body
                    if (snake.previousMv == "right") {
                        document.getElementById("body").style.transform = "rotate(0deg)"
                        document.getElementById("body").setAttribute("id", "")
                    }
                    if (snake.previousMv == "left") {
                        document.getElementById("body").style.transform = "rotate(180deg)"
                        document.getElementById("body").setAttribute("id", "")
                    }
                    if (snake.previousMv == "down") {
                        document.getElementById("body").style.transform = "rotate(90deg)"
                        document.getElementById("body").setAttribute("id", "")
                    }
                    if (snake.previousMv == "up") {
                        document.getElementById("body").style.transform = "rotate(-90deg)"
                        document.getElementById("body").setAttribute("id", "")
                    }

                }
                if (snake.direction != snake.previousMv && gameArray[i][j] == 2) {
                    document.getElementById(`${i}.${j}`).innerHTML = settings.turn
                    if (snake.direction == "right") {
                        if (snake.previousMv == "down") {
                            document.getElementById("turn").style.transform = "scaleX(-1)"
                            // document.getElementById("turn").style.transform += "scaleY(-1)"
                            document.getElementById("turn").setAttribute("id", "")
                        }
                        else if (snake.previousMv == "up") {
                            document.getElementById("turn").style.transform = "scaleX(-1)"
                            document.getElementById("turn").style.transform += "scaleY(-1)"
                            document.getElementById("turn").setAttribute("id", "")
                        }
                    }
                    else if (snake.direction == "left") {
                        if (snake.previousMv == "down") {
                            document.getElementById("turn").style.transform = "scaleX(1)"
                            document.getElementById("turn").setAttribute("id", "")
                        }
                        else if (snake.previousMv == "up") {
                            document.getElementById("turn").style.transform = "scaleY(-1)"
                            document.getElementById("turn").setAttribute("id", "")
                        }
                    }
                    else if (snake.direction == "up") {
                        if (snake.previousMv == "right") {
                            document.getElementById("turn").style.transform = "scaleX(1)"
                            document.getElementById("turn").setAttribute("id", "")
                        }
                        else if (snake.previousMv == "left") {
                            document.getElementById("turn").style.transform = "scaleX(-1)"
                            document.getElementById("turn").setAttribute("id", "")
                        }
                    }
                    else if (snake.direction == "down") {
                        if (snake.previousMv == "right") {
                            document.getElementById("turn").style.transform = "scaleY(-1)"
                            document.getElementById("turn").setAttribute("id", "")
                        }
                        else if (snake.previousMv == "left") {
                            document.getElementById("turn").style.transform = "scaleY(-1)"
                            document.getElementById("turn").style.transform += "scaleX(-1)"
                            document.getElementById("turn").setAttribute("id", "")
                        }
                    }
                }

                if (gameArray[i][j] == snake.len) {
                    document.getElementById(`${i}.${j}`).innerHTML = settings.tail
                    if (gameArray[i][j + 1] == snake.len - 1) {
                        document.getElementById("tail").style.transform = "rotate(0deg)"
                    }
                    if (gameArray[i][j - 1] == snake.len - 1) {
                        document.getElementById("tail").style.transform = "rotate(180deg)"
                    }
                    if (gameArray?.[i + 1]?.[j] == snake.len - 1) {
                        document.getElementById("tail").style.transform = "rotate(90deg)"
                    }
                    if (gameArray?.[i - 1]?.[j] == snake.len - 1) {
                        document.getElementById("tail").style.transform = "rotate(-90deg)"
                    }
                }
            }
        }
        snake.previousMv = snake.direction
        // render()
    }, 100)
}

function render() {
    for (let i = 0; i < settings.height; i++) {
        for (let j = 0; j < settings.width; j++) {
            document.getElementById(`${i}.${j}`).innerHTML = gameArray[i][j]
        }
    }
}

document.addEventListener('keydown', logKey);
function logKey(e) {
    if (first == 1) {
        move(10, 10)
        randomApple()
        first = 0
    }
    if (e.which == "39" && snake.direction != "left" && snake.direction != "right" || e.which == "68" && snake.direction != "left" && snake.direction != "right") {
        snake.direction = "right"
    }
    else if (e.which == "37" && snake.direction != "right" && snake.direction != "left" || e.which == "65" && snake.direction != "right" && snake.direction != "left") {
        snake.direction = "left"
    }
    else if (e.which == "38" && snake.direction != "down" && snake.direction != "up" || e.which == "87" && snake.direction != "down" && snake.direction != "up") {
        snake.direction = "up"
    }
    else if (e.which == "40" && snake.direction != "up" && snake.direction != "down" || e.which == "83" && snake.direction != "up" && snake.direction != "down") {
        snake.direction = "down"
    }
}

createGameboard()
start()
