// Enemies our player must avoid
let allEnemies = [];

var Enemy = function(xValue, yValue) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  // The enemies should be initilized with a value sent by the constructor.
  this.x = xValue;
  this.y = yValue;
  // The arbitraty number is related to a number which will be multiplied to implement the moviment and velocity.
  this.arbitratyNumber = 150;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x >= ctx.canvas.clientWidth) {
    getEnemyClean.call(this);
  }

  //I'm checking if the bug is in a defined collision raius.
  if (player.x <= (Math.round(this.x) + 75) && player.x >= (Math.round(this.x) - 50)  && this.y == player.y) {
    getPlayerClean();
  }

  //Updating the X.
  this.x += this.arbitratyNumber * dt;
};

function getEnemyClean() {
  this.x = -90;
  //so I get a random value between the max and min value.
  this.arbitratyNumber = Math.random() * (400 - 100) + 100;
}

function getPlayerClean() {
  player.x = 200;
  player.y = 380;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(xValue, yValue) {
  this.sprite = "images/char-boy.png";
  this.x = xValue;
  this.y = yValue;
};

Player.prototype.update = function(dt) {};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  if (key == "up" && player.y > 0) {
    player.y -= 80;
  }
  if (key == "right" && player.x < 400) {
    player.x += 100;
  }
  if (key == "down" && player.y < 380) {
    player.y += 80;
  }
  if (key == "left" && player.x > 0) {
    player.x -= 100;
  }

  if (player.y == -20) {
    getPlayerClean();
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

enemy1 = new Enemy(100, 60);
enemy2 = new Enemy(-20, 60);
enemy3 = new Enemy(0, 140);
enemy4 = new Enemy(-120, 140);
enemy5 = new Enemy(-100, 220);
enemy6 = new Enemy(200, 220);
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);
allEnemies.push(enemy6);

player = new Player(200, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
