var gamePattern = [];

var buttonColours = ["red","blue","yellow","green"];

var userClickedPattern = [];

$(".btn").click(function() {
    var userChosenColour=$(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userChosenColour.length-1);
});

var level=0;
var started=false;

$(document).keypress(function () {
    if(!started) {
        $("h1").text("level " + level);
        
        nextSequence();
        started=true;
    }
});

function nextSequence() {

    level++;

    $("h1").text("level "+ level);

    var randomNumber= Math.floor(Math.random() * 4);
    console.log(randomNumber);
    
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

};

function playSound(name) {
    var audio= new Audio("sounds/"+ name + ".mp3");
    audio.play();
    
};

function animatePress(currentColour) {

    $("#"+ currentColour).addClass("pressed");

    setTimeout(function (){
        $("#"+ currentColour).removeClass("pressed")}, 250);
};


function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length) {
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }
    else {

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout( function(){
            $("body").removeClass("game-over");
        } ,200);

        $("h1").text("Game over, press any key to restart bro!")
        startOver();
    }

};

function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}