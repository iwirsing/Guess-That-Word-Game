var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
var blanksLetters = [];

// Array of words the user will guess
var words = ["variable","array", "modulus", "object", "function", "string", "boolean","computer","algorithm","normalize"];


// The init function is called when the page loads 
function init() {
  getWins();
  getlosses();
  timerElement.textContent = 10;
}

// The startGame function is called when the start button is clicked
function startGame() {
    //initialize word
    blanksLetters = [];//reset
    timerElement.textContent="10";
    chosenWord=words[Math.floor(Math.random()*words.length)];
    console.log(chosenWord);
    
    //converts chosenword into array
    lettersInChosenWord=chosenWord.split("");
    //loop the word length
    //initialize blanks array
    for (i=0; i<chosenWord.length; i++){
        blanksLetters.push("_"); //initialize the array
    }
    console.log(blanksLetters);
  renderBlanks();
  startTimer();

}

// The winGame function is called when the win condition is met
function winGame() {
    winCounter++;
    setWins();
}

// The loseGame function is called when timer reaches 0
function loseGame() {
    loseCounter++;
    setLosses();
    
}



// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  var timerCount=11;
  timer = setInterval(function() {
  timerCount--;
  timerElement.textContent = timerCount;
  
        
    if (timerCount >= 0) {
      // Tests if win condition is met
        if (isWin) {
        // Clears interval and stops timer
        clearInterval(timer);
        timerElement.textContent = "You Win";
        winGame();
        isWin=false;
      
        
        }
    }

    //else out of time lose
   else {
        clearInterval(timer);
        timerElement.textContent = "You Lost";
        loseGame();
        
        
   }


  }, 1000);
  
}

// Creates blanks on screen
function renderBlanks() {
    wordBlank.textContent="";//empty
    for (i=0; i<chosenWord.length; i++){
       wordBlank.textContent+=" "+blanksLetters[i];
    }
    return;
    
}

// Updates win count on screen and sets win count to client storage
function setWins() {
    win.textContent=winCounter;
    localStorage.setItem("winCounter",winCounter);
    
    
}
// Updates lose count on screen and sets lose count to client storage
function setLosses() {
    lose.textContent=loseCounter;
    localStorage.setItem("loseCounter",loseCounter);
 
}

// These functions are used by init
function getWins() {
    var winRecap= localStorage.getItem("winCounter");
    win.textContent=winRecap;
}

function getlosses() {
    var lossRecap= localStorage.getItem("loseCounter");
    lose.textContent=lossRecap;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  for(i=0;i<lettersInChosenWord.length;i++){
    //if any mismatched letter
    if (lettersInChosenWord[i]!== blanksLetters[i]){
        isWin=false;
        console.log(isWin);
        return; //end
    }
  }
  isWin=true;
  return;

}

// Tests if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {

    var letterInWord=false;

    console.log(lettersInChosenWord);
    //if in chosen word
    if (lettersInChosenWord.includes(letter)){
        //find the index loop
        for(var i=0;i<lettersInChosenWord.length;i++){
            //if letter found, set it in blanksLetters
            if (letter===lettersInChosenWord[i]){
              letterInWord=true;
               
            }
          }
          //if letter in Word put it in all possible indices
          if (letterInWord){
            for(var i=0;i<lettersInChosenWord.length;i++){
              if (letter===lettersInChosenWord[i]){
                blanksLetters[i]=letter;
                renderBlanks();
                console.log(letter);
                console.log(blanksLetters);
              }
          } 

        }

    }

    
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
  // If the count is zero, exit function
  if (timerCount===0) {
    
    return;
  }

  // Convert all keys to lower case
  var letterGuessed = event.key.toLowerCase();
  var alphabetNumericCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789 '.split('');
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(letterGuessed)){
    checkLetters(letterGuessed);
    checkWin();
  }
  else {
    return; //do nothing
  }
  


});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();


// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  event.preventDefault();
  // Resets win and loss count
  localStorage.setItem("winCounter",0);
  localStorage.setItem("loseCounter",0);
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}

// Attaches event listener to button
resetButton.addEventListener("click", resetGame);