var buttonColours =["red", "blue", "green", "yellow"];

var level = 0;
var gamePattern=[];
var started = false;
var userClickedPattern = [];

function nextSequence() {

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
    level++;
$("#level-title").text("Level "+ level);

}


$(".btn").on("click",function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
 });

function playSound(name){
    var audio = new Audio("sounds/"+name +'.mp3');
    audio.play();
}

function  animatePress(currentColour){
$("#"+currentColour).addClass("pressed");

setTimeout(function(){
    $("#"+currentColour).removeClass("pressed"); 
},100);

}

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      }  
       else {
  
        console.log("wrong");

        $("body").addClass("game-over");

        var wrongAudio = new Audio('sounds/wrong.mp3');
        wrongAudio.play();

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
       }

  };


  function startOver(){
level=0;
gamePattern=[];
started = false;
  };