var word = null;
var attempts = [];
var correct = 0;
var totalGuesses = 0;
var currentGameGuesses = 0;

const messages = document.getElementById("messages");
const currentCorrect = document.getElementById("currentCorrect");
const gamesPlayedElement = document.getElementById("gamesPlayed");
const totalGuessesElement = document.getElementById("totalGuesses");
const avgGuessesElement = document.getElementById("avgGuesses");

function loadedPage() {
    console.log("current word is " + word);
    if (localStorage.getItem("totalGuesses") != null) {
        totalGuesses = localStorage.getItem("totalGuesses");
    }
    if (localStorage.getItem("correct") != null) {
        correct = localStorage.getItem("correct");
    }
    if (localStorage.getItem("attempts") != null) {
        attempts = localStorage.getItem("attempts");
    }
    if (localStorage.getItem("currentGameGuesses") != null) {
        currentGameGuesses = localStorage.getItem("currentGameGuesses");
        guessbox.removeAttribute("readonly");
    }
    if (localStorage.getItem("word") != null) {
        word = localStorage.getItem("word");
        console.log("reloaded word " + word);
    }

    currentCorrect.innerHTML = correct;
    var guessesSum = parseInt(totalGuesses) + parseInt(currentGameGuesses);
    totalGuessesElement.innerHTML = parseInt(guessesSum);
    if(correct == 0) {
        avgGuessesElement.innerHTML = 0;
    }
    else {
        avgGuessesElement.innerHTML = parseFloat(parseInt(totalGuesses)+parseInt(currentGameGuesses))/parseFloat(correct);
    }
}

function resetHistory() {
    localStorage.clear();
    word = null;
    localStorage.removeItem("word");
    guessbox.value = "";
    correct = 0;
    totalGuesses = 0;
    currentGameGuesses = 0;
    attempts = [];
    currentCorrect.innerHTML = correct;
    totalGuessesElement.innerHTML = totalGuesses;
    avgGuessesElement.innerHTML = 0;
    guessbox.setAttribute("readonly", "readonly");
}


function setUpGame(newWord) {
    console.log("restarted");
    console.log(newWord);
    guessbox.removeAttribute("readonly");
    word = newWord;
    localStorage.setItem("word", word);
    attempts = [];
    guessbox.value = "";
    messages.innerHTML = "";
    currentGameGuesses = 0;
    localStorage.setItem("currentGameGuesses", currentGameGuesses);
    var guessesSum = parseInt(totalGuesses) + parseInt(currentGameGuesses);
    totalGuessesElement.innerHTML = parseInt(guessesSum);
    localStorage.setItem("correct", correct);
    localStorage.setItem("totalGuesses", totalGuesses);
    localStorage.setItem("attempts", attempts);
}

function newWord(newWord){
    word = newWord;
    localStorage.setItem("word", word);
}

function setupMessage(attempt){
    console.log(attempt);
}

function submitGuess(guess){
    var attempt={Status:"Correct!", Char:0, Loc:0, Length:"long"}
    guess = guess.toLowerCase();
    currentGameGuesses ++;
    localStorage.setItem("currentGameGuesses", currentGameGuesses);
    var guessesSum = parseInt(totalGuesses) + parseInt(currentGameGuesses);
    totalGuessesElement.innerHTML = parseInt(guessesSum);
    if(guess==word){
        //setupMessage(attempt);
        getRandomWord(newWord);
        alert("CORRECT!");
        correct++;
        currentCorrect.innerHTML = correct;
        localStorage.setItem("correct", correct);
        totalGuesses = parseInt(totalGuesses) + parseInt(currentGameGuesses);
        localStorage.setItem("totalGuesses", totalGuesses);
        currentGameGuesses = 0;
        localStorage.setItem("currentGameGuesses", currentGameGuesses);
        var guessesSum = totalGuesses + currentGameGuesses;
        console.log(guessesSum);
        totalGuessesElement.innerHTML = parseInt(guessesSum);
    }
    else{
        alert("wrong");
    }
    attempts.push(attempt);
    localStorage.setItem("attempts", attempts);
    if(correct == 0) {
        avgGuessesElement.innerHTML = 0;
    }
    else {
        avgGuessesElement.innerHTML = parseFloat(parseInt(totalGuesses)+parseInt(currentGameGuesses))/parseFloat(correct);
    }
    localStorage.setItem("word", word);
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