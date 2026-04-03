const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).on("keypress", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playsound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
            startOver();
        }, 200);
    }
};

const nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    const randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
};

const animatePress = (currentColour) => {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

const playsound = (name) => {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

const startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
};