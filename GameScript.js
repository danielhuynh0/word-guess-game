var word = null;
var attempts = [];
var correct = 0;
var gamesPlayed = 0;

const messages = document.getElementById("messages");
const currentCorrect = document.getElementById("currentCorrect");
const gamesPlayedElement = document.getElementById("gamesPlayed");

function loadedPage() {
    if (localStorage.getItem("gamesPlayed") != null) {
        gamesPlayed = localStorage.getItem("gamesPlayed");
    }
    if (localStorage.getItem("correct") != null) {
        correct = localStorage.getItem("correct");
    }
    if (localStorage.getItem("attempts") != null) {
        attempts = localStorage.getItem("attempts");
    }

    currentCorrect.innerHTML = correct;
    gamesPlayedElement.innerHTML = gamesPlayed;
}

function resetHistory() {
    localStorage.clear();
    gamesPlayed = 0;
    correct = 0;
    attempts = [];
    currentCorrect.innerHTML = correct;
    gamesPlayedElement.innerHTML = gamesPlayed;
}


function setUpGame(newWord) {
    console.log("restarted");
    if(gamesPlayed == 0) {
        guessbox.removeAttribute("readonly");
    }
    word = newWord;
    correct = 0;
    gamesPlayed = 0;
    attempts = [];
    guessbox.value = "";
    messages.innerHTML = "";
    getRandomWord(setUpGame);
}

function newWord(newWord){
    word = newWord;
}

function setupMessage(){

}

function submitGuess(guess){
    var attempt={Status:"Correct!", Char:0, Loc:0, Length:"long"}
    guess = guess.toLowerCase();
    if(guess==word){
        alert("correct");
        setupMessage(attempt);
        getRandomWord(newWord);
        correct++;
        currentCorrect.innerHTML = correct;
    }
    else{
        alert("wrong");
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