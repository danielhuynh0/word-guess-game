var gameObject = {
    "word": null,
    "attempts": [],
    "correct": 0,
    "totalGuesses": 0,
    "currentGameGuesses": 0,
    "winStreak": 0
}


const messages = document.getElementById("messages");
const currentCorrect = document.getElementById("currentCorrect");
const gamesPlayedElement = document.getElementById("gamesPlayed");
const totalGuessesElement = document.getElementById("totalGuesses");
const avgGuessesElement = document.getElementById("avgGuesses");
const winStreakElement = document.getElementById("winStreak");

function loadedPage() {
    console.log("current word is " + gameObject["word"]);
    if (localStorage.getItem("game") != null) {
        gameObject = localStorage.getItem("game");
        gameObject = JSON.parse(gameObject);
        console.log(gameObject["correct"]);

        currentCorrect.innerHTML = gameObject["correct"];
        var guessesSum = parseInt(gameObject["totalGuesses"]) + parseInt(gameObject["currentGameGuesses"]);
        totalGuessesElement.innerHTML = parseInt(guessesSum);
        if(gameObject["correct"] == 0) {
            avgGuessesElement.innerHTML = 0;
        }
        else {
            avgGuessesElement.innerHTML = parseFloat(parseInt(gameObject["totalGuesses"]) + parseInt(gameObject["currentGameGuesses"]))/parseFloat(gameObject["correct"]);
        }
        winStreakElement.innerHTML = gameObject["winStreak"];
    }
    else {
        gameObject["word"] = null;
        gameObject["attempts"] = [];
        gameObject["correct"] = 0;
        gameObject["totalGuesses"] = 0;
        gameObject["currentGameGuesses"] = 0;
        gameObject["winStreak"] = 0;
        localStorage.setItem("game", JSON.stringify(gameObject));
    }

    if(gameObject["winStreak"] > 0) {
        guessbox.setAttribute("readonly", "readonly");
    }
    else {
        guessbox.removeAttribute("readonly");
    }
    console.log(gameObject);

    currentCorrect.innerHTML = gameObject["correct"];
    var guessesSum = parseInt(gameObject["totalGuesses"]) + parseInt(gameObject["currentGameGuesses"]);
    totalGuessesElement.innerHTML = parseInt(guessesSum);
    if(gameObject["correct"] == 0) {
        avgGuessesElement.innerHTML = 0;
    }
    else {
        avgGuessesElement.innerHTML = parseFloat(parseInt(gameObject["totalGuesses"]) + parseInt(gameObject["currentGameGuesses"]))/parseFloat(gameObject["correct"]);
    }
    winStreakElement.innerHTML = gameObject["winStreak"];
}

function resetHistory() {
    guessbox.value = "";
    localStorage.clear();
    gameObject["word"] = null;
    gameObject["correct"] = 0;
    gameObject["totalGuesses"] = 0;
    gameObject["currentGameGuesses"] = 0;
    gameObject["winStreak"] = 0;
    gameObject["attempts"] = [];
    currentCorrect.innerHTML = gameObject["correct"];
    totalGuessesElement.innerHTML = gameObject["totalGuesses"];
    avgGuessesElement.innerHTML = 0;
    winStreakElement.innerHTML = gameObject["winStreak"];
    guessbox.setAttribute("readonly", "readonly");
    localStorage.setItem("game", JSON.stringify(gameObject));
}


function setUpGame(newWord) {
    console.log("restarted");
    console.log(newWord);
    guessbox.removeAttribute("readonly");
    gameObject["word"] = newWord;
    gameObject["attempts"] = [];
    guessbox.value = "";
    messages.innerHTML = "";
    gameObject["currentGameGuesses"] = 0;
    var guessesSum = parseInt(gameObject["totalGuesses"]) + parseInt(gameObject["currentGameGuesses"]);
    totalGuessesElement.innerHTML = parseInt(guessesSum);
    if(gameObject["correct"] == 0) {
        avgGuessesElement.innerHTML = 0;
    }
    else {
        avgGuessesElement.innerHTML = parseFloat(parseInt(gameObject["totalGuesses"])+parseInt(gameObject["currentGameGuesses"]))/parseFloat(gameObject["correct"]);
    }
    winStreakElement.innerHTML = gameObject["winStreak"];
}

function newWord(newWord){
    gameObject["word"] = newWord;
}

function setupMessage(attempt){
    console.log(attempt);
}

function submitGuess(guess){
    var attempt={Status:"Correct!", Char:0, Loc:0, Length:"long"}
    guess = guess.toLowerCase();
    gameObject["currentGameGuesses"] = gameObject["currentGameGuesses"] + 1;
    localStorage.setItem("game", JSON.stringify(gameObject));
    var guessesSum = parseInt(gameObject["totalGuesses"]) + parseInt(gameObject["currentGameGuesses"]);
    totalGuessesElement.innerHTML = parseInt(guessesSum);
    console.log(gameObject["currentGameGuesses"]);
    if(guess==gameObject["word"]){
        setupMessage(attempt);
        gameObject["correct"] = gameObject["correct"] + 1;
        currentCorrect.innerHTML = gameObject["correct"];
        gameObject["totalGuesses"] = parseInt(gameObject["totalGuesses"]) + parseInt(gameObject["currentGameGuesses"]);
        gameObject["currentGameGuesses"] = 0;
        var guessesSum = parseInt(gameObject["totalGuesses"]) + parseInt(gameObject["currentGameGuesses"]);
        console.log(guessesSum);
        totalGuessesElement.innerHTML = parseInt(guessesSum);
        gameObject["winStreak"] = gameObject["winStreak"] + 1;
        winStreakElement.innerHTML = gameObject["winStreak"];
        localStorage.setItem("game", JSON.stringify(gameObject));
        alert("CORRECT!");
    }
    else{
        alert("Wrong");
        gameObject["winStreak"] = 0;
        localStorage.setItem("game", JSON.stringify(gameObject));
        winStreakElement.innerHTML = gameObject["winStreak"];
    }
    gameObject["attempts"].push(attempt);
    localStorage.setItem("game", JSON.stringify(gameObject));
    if(gameObject["correct"] == 0) {
        avgGuessesElement.innerHTML = 0;
    }
    else {
        avgGuessesElement.innerHTML = parseFloat(parseInt(gameObject["totalGuesses"])+parseInt(gameObject["currentGameGuesses"]))/parseFloat(gameObject["correct"]);
    }
    localStorage.setItem("game", JSON.stringify(gameObject));
}

function submitForm(){
    const box = document.getElementById("guessbox");
    const guess = box.value;

    submitGuess(guess);
}


const newGameButton = document.getElementById("newGame");
newGameButton.addEventListener("click", function() { getRandomWord(setUpGame);});

const form = document.getElementById("mainForm");
form.addEventListener("submit", submitForm);

const guessbox = document.getElementById("guessbox");

const resetButton = document.getElementById("resetHistory");
resetButton.addEventListener("click", resetHistory);