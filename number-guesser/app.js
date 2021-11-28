// set of rules
// -validate guess
// -predefined set of guesses
// -notify player of remaining guessers
// -notfiy player -> success or failure
// -let player choose to play again

//game values
let min = 1,
  max = 10,
  winningNum = assignRandomNum(min, max),
  guessesLeft = 3;

//ui elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//   set range
minNum.textContent = min;
maxNum.textContent = max;

// guess listner
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  //check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct. you won`);
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      //game over
      gameOver(false, `You lost, the winning number was ${winningNum}`);
    } else {
      guessInput.style.borderColor = "red";
      guessInput.value = "";
      //continues
      setMessage(
        `${guess} is not correct,  ${guessesLeft} guesses left`,
        "green"
      );
    }
  }
});

//set notify messages
function setMessage(error, color) {
  message.style.color = color;
  message.textContent = error;
}

//game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  //play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

//play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

//random number
function assignRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
