var word = null;
var attempts = [];
var correct = 0;
var totalGuesses = 0;

const messages = document.getElementById("messages");
const currentCorrect = document.getElementById("currentCorrect");
const gamesPlayedElement = document.getElementById("gamesPlayed");
const totalGuessesElement = document.getElementById("totalGuesses");
const avgGuessesElement = document.getElementById("avgGuesses");

function loadedPage() {
    console.log("loaded page");
    if (localStorage.getItem("totalGuesses") != null) {
        totalGuesses = localStorage.getItem("totalGuesses");
        guessbox.removeAttribute("readonly");
    }
    if (localStorage.getItem("correct") != null) {
        correct = localStorage.getItem("correct");
    }
    if (localStorage.getItem("attempts") != null) {
        attempts = localStorage.getItem("attempts");
    }

    currentCorrect.innerHTML = correct;
    totalGuessesElement.innerHTML = totalGuesses;
    if(correct == 0) {
        avgGuessesElement.innerHTML = 0;
    }
    else {
        avgGuessesElement.innerHTML = totalGuesses/correct;
    }
}

function resetHistory() {
    localStorage.clear();
    word = null;
    guessbox.value = "";
    correct = 0;
    totalGuesses = 0;
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
    correct = 0;
    gamesPlayed = 0;
    attempts = [];
    guessbox.value = "";
    messages.innerHTML = "";
}

function newWord(newWord){
    word = newWord;
}

function setupMessage(attempt){
    console.log(attempt);
}

function submitGuess(guess){
    var attempt={Status:"Correct!", Char:0, Loc:0, Length:"long"}
    guess = guess.toLowerCase();
    totalGuesses++;
    totalGuessesElement.innerHTML = totalGuesses;
    localStorage.setItem("totalGuesses", totalGuesses);
    if(guess==word){
        alert("correct");
        setupMessage(attempt);
        getRandomWord(newWord);
        correct++;
        currentCorrect.innerHTML = correct;
        localStorage.setItem("correct", correct);
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
        avgGuessesElement.innerHTML = totalGuesses/correct;
    }
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