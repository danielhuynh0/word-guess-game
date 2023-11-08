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

function setUpMessage(attempt){

}

function submitGuess(guess){
    guess = guess.toLowerCase();
    if(guess)
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