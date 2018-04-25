// Enemies our player must avoid
let allEnemies = [];

// This is the Father Class.
var Character = function(xValue, yValue, image) {
  this.sprite = image;
  this.x = xValue;
  this.y = yValue;
}

Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemy class, son of Character.
var Enemy = function(xValue, yValue) {

  //By Inheritance, I'm using the Father constructor to initialize the values.
  Character.call(this, xValue, yValue, 'images/enemy-bug.png');

  // The arbitraty number is related to a number which will be multiplied to implement the moviment and velocity.
  this.arbitratyNumber = 150;
};
//Here, I'm linking Enemy to his Father Character (same of extends in ES6);
Enemy.prototype = Object.create(Character.prototype);
//Here, I'm linking the Enemy's constructor with the very Enemy, this way his methods can be accessed.
Enemy.prototype.constructor = Enemy;

// Update the enemy's position.
// Parameter: dt, a time delta.
Enemy.prototype.update = function(dt) {
  if (this.x >= ctx.canvas.clientWidth) {
    getEnemyClean.call(this);
  }

  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  //Updating the X.
  this.x += this.arbitratyNumber * dt;
};

function getEnemyClean() {
  this.x = -90;
  //I get a random value between the max and min value.
  this.arbitratyNumber = Math.random() * (400 - 100) + 100;
}

//Takes the player to the origin point.
function getPlayerClean() {
  player.x = 200;
  player.y = 380;
}

// Player class, son of Character.
var Player = function(xValue, yValue) {
  //By Inheritance, I'm using the Father constructor to initialize the values.
  Character.call(this, xValue, yValue, 'images/char-boy.png');
};

//Here, I'm linking Enemy to his Father Character (same of extends in ES6);
Player.prototype = Object.create(Character.prototype);
//Here, I'm linking the Enemy's constructor with the very Enemy, this way his methods can be accessed.
Player.prototype.constructor = Player;

//The Player Update method is responsible to check if the user has arrived to the destiny.
Player.prototype.update = function() {
  if (this.y == -20) {
    getPlayerClean();
  }
};

// This function is responsible to change the position to be rendered according to the key pressed. 
//It also validates before changing.
Player.prototype.handleInput = function(key) {
  if (key == "up" && this.y > 0) {
    this.y -= 80;
  }
  if (key == "right" && this.x < 400) {
    this.x += 100;
  }
  if (key == "down" && this.y < 380) {
    this.y += 80;
  }
  if (key == "left" && this.x > 0) {
    this.x -= 100;
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
