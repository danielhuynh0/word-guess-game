var word;
var attempts = [];
const messages = document.getElementById("messages");

function setupGame(newWord){
    word = newWord;
    attempts = [];

    while (messages.firstChild) {
        messages.removeChild(messages.firstChild);
    }
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
        setupMessage(attempt);
        getRandomWord(newWord);
    }
    else{
        
    }
}

function submitForm(){
    const box = document.getElementById("guessbox");
    const guess = box.value;

    submitGuess(guess);
}

getRandomWord(setupGame);

const newGameButton = document.getElementById("newGame");
newGameButton.addEventListener("click", function() { getRandomWord(setupGame); });

const form = document.getElementById("mainForm");
form.addEventListener("submit", submitForm);