var canvas = document.getElementById("myGame");
var context = canvas.getContext('2d');
var key=false;
const scoreEl = document.getElementById("scoreEl");
const timeEl = document.getElementById("timeEl");
const StartGameBtn = document.getElementById("StartGameBtn");
const modalEl = document.getElementById("modalEl");
const bigScoreEl = document.getElementById("bigScoreEl");

// The Score init
var score = 0;
var time = 60;
// Property of big square
var speed = 3;
var sideLenght = 40;
var x = 10;
var y = 50;
// Property of target square
var targetX = 200;
var targetY = 50;
var targetLenght = 10;
var up = false;
var down = false;
var right = false;
var left = false;

function init(){
  x = 10;
  y = 50;
  speed = 6;
  sideLenght = 50;
  targetX = 200;
  targetY = 50;
  targetLenght = 10;
  up = false;
  down = false;
  right = false;
  left = false;
  score = 0;
  time = 60;
}

function isWithin(a, b, c) { 
  return (a>b && a<c);
}
function erase() {
  context.fillStyle = "#FFFFFF";
  context.fillRect(0,0,600,400);
}

function respawn() {
  targetX = Math.round(Math.random() * canvas.width - targetLenght);
  targetY = Math.round(Math.random() * canvas.height - targetLenght);
}

function draw() {
  // Clear screen
  erase();
  // Todo: Update location base on keyboard click
  if(down) {
    y += speed;
  } else if(up) {
    y -= speed;
  } else if(right) {
    x += speed;
  } else if(left) {
    x -= speed; // x = x -speed
  }

  // keep the square within the border
  if(y + sideLenght > canvas.height) {
    y = canvas.height - sideLenght;
  }
  if(x + sideLenght > canvas.width) {
    x = canvas.width - sideLenght;
  }
  if (y < 0) {
    y = 0;
  }
  if(x < 0) {
    x = 0;
  }

  // Detect if big square collides with target
  if(isWithin(targetX, x, x+sideLenght) || isWithin(targetX + targetLenght, x, x+sideLenght)) {
    if(isWithin(targetY, y, y + sideLenght) || isWithin(targetY + targetLenght, y , y+sideLenght)) {
      // Respawn target: delete old target, and random new target at other location
      respawn();
      // Increase score
      score+=10;
      scoreEl.innerHTML = score;
      console.log(score);
    }
  }
  // Draw
  context.fillStyle = "#616A6B";
  context.fillRect(x, y, sideLenght, sideLenght);


  // Draw target
  context.fillStyle= "#E74C3C";
  context.fillRect(targetX, targetY, targetLenght, targetLenght);

  if(time <= 0) {
    // Game end 
    modalEl.style.display = 'block';
    bigScoreEl.innerHTML=score;
  } else {
    requestAnimationFrame(draw);
    // bigScoreEl.innerHTML = score;
  }
}


setInterval(function() {
    time--;
    timeEl.innerHTML = time;
    console.log('time', time);
    
}, 1000);


window.addEventListener('keydown', function(event) {
  event.preventDefault();
  console.log(event.key);
  down = false;
  up = false;
  left = false;
  right = false;

  if(event.key == "ArrowDown") {
    down = true;
  } else if(event.key == "ArrowUp") {
    up = true;
  } else if(event.key == "ArrowLeft") {
    left = true;
  } else if(event.key == "ArrowRight") {
    right  =  true;
  }
  
  
});

// draw();
StartGameBtn.addEventListener('click', (event) => {
  modalEl.style.display = "none";
  init();
  draw();
 
})
 


