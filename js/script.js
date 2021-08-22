import {init} from "./pose.js"
import {cactusList} from "./game.js"

let container = document.querySelector("#container");
let dino = document.querySelector("#dino");
let block = document.querySelector("#block");
let road = document.querySelector("#road");
let cloud = document.querySelector("#cloud");
let score = document.querySelector("#score");
let gameOver = document.querySelector("#gameOver");
let dinoPic = document.getElementById("dinoPic");
let cactusPic = document.getElementById("cactusPic");
let root = document.querySelector(':root');

let interval = null;
let playerScore = 0;
let run = true;

function scoreCounter() {
  playerScore++;
  score.innerHTML = `Score <b>${playerScore}</b>`;
}

window.addEventListener("keydown", (start) => {
  if (start.code == "Space") {
    init()
    gameOver.style.display = "none";
    block.classList.add("blockActive");
    road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
    cloud.firstElementChild.style.animation = "cloudAnimate 50s linear infinite";
    let playerScore = 0;
    let scoreInterval = setInterval(scoreCounter, 200);
    animateDino()
    animateCactus()
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp")
    if (dino.classList != "dinoActive") {
      dino.classList.add("dinoActive");
      setTimeout(() => {
        dino.classList.remove("dinoActive");
      }, 500);
    }
});

let result = setInterval(() => {
  let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));
  let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));
  // if (dinoBottom <= 90 && blockLeft >= 20 && blockLeft <= 95) {
  //   gameOver.style.display = "block";
  //   block.classList.remove("blockActive");
  //   road.firstElementChild.style.animation = "none";
  //   cloud.firstElementChild.style.animation = "none";
  //   clearInterval(scoreInterval);
  //   clearInterval(dinoInterval);
  //   playerScore = 0;
  //   dinoPic.src = "assets/dino_1.png"
  // }
}, 10);

function animateDino() {
  let dinoInterval = setInterval(() => {
    run = !run
    run == true ? dinoPic.src = "assets/dino_3.png" : dinoPic.src = "assets/dino_4.png"
  }, 200);  
}

function animateCactus() {
  block.addEventListener("transitionend", () => {
    var cactus = cactusList[Math.floor(Math.random() * cactusList.length)]
    cactusPic.src = cactus.url
    root.style.setProperty('--cactusWidth', 'cactus.width');
    var speed = (6000 - (6000 * Math.round(playerScore / 10)) / 100).toString() + "ms"
    block.classList.remove("blockActive");
    root.style.setProperty('--cactuSpeed', speed);
    setTimeout(() => block.classList.add("blockActive"), 0);
  })
}