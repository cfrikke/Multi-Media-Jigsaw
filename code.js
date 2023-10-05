let vt = 1;

function playVideo() {
    if(vt == 1){
    document.getElementById("thrasher").play();
    vt = 0;
    }else if(vt == 0){
     document.getElementById("thrasher").pause();
    vt = 1;
    }
}




var canvas, canvasContext,
  playerX = 500,
  playerY = 250,
  playerW = 20,
  playerH = 20,
  playerSpeedX = 0,
  playerSpeedY = 0;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 60;
    setInterval(function() {

      playerMove();
      drawAll();
      canvas.addEventListener('mousemove', updateMousePos);

      document.addEventListener('keydown', keyPressed);
      document.addEventListener('keyup', keyReleased);

    }, 1000 / framesPerSecond);
  }
  // Input /////////////////////////////////////////////////
var KEY_W = 87,
 KEY_A = 65,
 KEY_S = 83,
 KEY_D = 68,

 keyHeld_Down = false,
 keyHeld_Up = false,
 keyHeld_Left = false,
 keyHeld_Right = false,

 mouseX = 0,
 mouseY = 0;

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

}

function keyPressed(evt) {
  // console.log("Key pressed: "+evt.keyCode);
  if (evt.keyCode == KEY_A) {
    keyHeld_Left = true;
  }
  if (evt.keyCode == KEY_D) {
    keyHeld_Right = true;
  }
  if (evt.keyCode == KEY_W) {
    keyHeld_Up = true;
  }
  if (evt.keyCode == KEY_S) {
    keyHeld_Down = true;
  }

  evt.preventDefault();
}

function keyReleased(evt) {
  // console.log("Key pressed: "+evt.keyCode);
  if (evt.keyCode == KEY_A) {
    keyHeld_Left = false;
    playerSpeedX = 0;
  }
  if (evt.keyCode == KEY_D) {
    keyHeld_Right = false;
    playerSpeedX = 0;
  }
  if (evt.keyCode == KEY_W) {
    keyHeld_Up = false;
    playerSpeedY = 0;
  }
  if (evt.keyCode == KEY_S) {
    keyHeld_Down = false;
    playerSpeedY = 0;
  }
}

// moving /////////
function playerMove() {
  playerX += playerSpeedX;
  playerY += playerSpeedY;
  if (keyHeld_Up) {
    playerSpeedY = -7;
  }
  if (keyHeld_Down) {
    playerSpeedY = 7;
  }
  if (keyHeld_Left) {
    playerSpeedX = -7;
  }
  if (keyHeld_Right) {
    playerSpeedX = 7;
  }
  if (playerY <= 0) { // player wrapping top to bottom
    playerY = canvas.height - playerH + 2;
  } else if (playerY >= canvas.height - playerH) { // player wrapping top to bottom
    playerY = 2;
  }

  if (playerX >= canvas.width - playerW) { // player wrapping top to bottom
    playerX = 2;
  } else if (playerX <= 0) { // player wrapping top to bottom
    playerX = canvas.width - playerW + 2;
  }
}

// Drawing ////////////////////////////////////////////////
function drawAll() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  colorText("Control With: W-A-S-D", 10, canvas.height - 10, 'grey');
  colorRect(playerX, playerY, playerW, playerH, 'white');

}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = 'drawColor';
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorText(shownText, xPos, yPos, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillText(shownText, xPos, yPos);
}