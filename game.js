var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPressed = [];
var level = 0;
var start = 0;


$(document).on("keypress", function() {
  if (start === 0) {
    start = 1;
    nextPattern();
  }
});


$(".btn").on("click", function() {
  if (start === 0) {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    sound("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    restart();

  } else {
    var pressed = this.id;
    userPressed.push(pressed);
    animation(pressed);
    sound(pressed);
    console.log(gamePattern);
    console.log(userPressed);
    check(userPressed.length - 1);
  }
});


function nextPattern() {
  userPressed = [];
  level++;
  $("#level-title").text("Level " + level);

  var num = Math.floor(Math.random() * 4);
  gamePattern.push(colors[num]);

  animation(colors[num]);
  sound(colors[num]);
}


function check(currentLevel) {
  if (gamePattern[currentLevel] === userPressed[currentLevel]) {
    if (userPressed.length === gamePattern.length) {
      setTimeout(function() {
        nextPattern();
      }, 1000);
    }
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    sound("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    restart();
  }
}

function animation(color) {
  $("." + color).addClass("pressed");
  setTimeout(function() {
    $("." + color).removeClass("pressed");
  }, 100);
}

function sound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function restart() {
  start = 0;
  gamePattern = [];
  level = 0;
}
