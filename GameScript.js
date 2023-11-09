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
        var retrievedGameObject = localStorage.getItem("game");
        gameObject = JSON.parse(retrievedGameObject);
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
    updateMessages();
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
    messages.innerHTML = '<label>You guessed ' + attempt["Word"] + '. ' + attempt["Status"] + ' You\'re guess had ' +  attempt["Char"] +
    ' correct characters, ' + attempt["Loc"] + ' characters were in the right place. In length, the guess was ' + attempt["Length"] + 
    '.</label>' + messages.innerHTML;
}

function updateMessages(){
    for(var a of gameObject["attempts"]){
        messages.innerHTML = '<label>You guessed \"' + a["Word"] + '\". ' + a["Status"] + ' You\'re guess had ' +  a["Char"] +
        ' correct characters, ' + a["Loc"] + ' characters were in the right place. In length, the guess was ' + a["Length"] + 
        '.</label>' + messages.innerHTML;
    }
}

function submitGuess(guess){
    alert(gameObject["word"]);
    let len = gameObject["word"].length;
    var attempt={"Word":guess, "Status":"Correct!", "Char":len, "Loc":len, "Length":"just right"}
    guess = guess.toLowerCase();
    gameObject["currentGameGuesses"] = gameObject["currentGameGuesses"] + 1;
    localStorage.setItem("game", JSON.stringify(gameObject));
    var guessesSum = parseInt(gameObject["totalGuesses"]) + parseInt(gameObject["currentGameGuesses"]);
    totalGuessesElement.innerHTML = parseInt(guessesSum);
    console.log(gameObject["currentGameGuesses"]);
    if(guess==gameObject["word"]){
        //setupMessage(attempt);
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
        //alert("CORRECT!");
    }
    else{
        attempt["Status"]="Wrong!";
        if(guess.length < gameObject["word"].length){ 
            attempt["Length"]="too short"; 
        }
        if(guess.length > gameObject["word"].length){ 
            attempt["Length"]="too long";
        }
        var countP=0;
        var countC=0;
        var index=0;
        while(index<guess.length && index<gameObject["word"].length){
            if(guess.charAt(index) == gameObject["word"].charAt(index)){
                countP=countP+1;
            }
            if(gameObject["word"].includes(guess.charAt(index))){
                let sub=guess.substr(0,index);
                if(!sub.includes(guess.charAt(index))){
                    countC=countC+1;
                }
            }
            index=index+1;
        }
        attempt["Char"]=countC;
        attempt["Loc"]=countP;

        gameObject["winStreak"] = 0;
        localStorage.setItem("game", JSON.stringify(gameObject));
        winStreakElement.innerHTML = gameObject["winStreak"];
    }
    gameObject["attempts"].push(attempt);
    //setupMessage(attempt);
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

const resetButton = document.getElementById("resetHistory");
resetButton.addEventListener("click", resetHistory);