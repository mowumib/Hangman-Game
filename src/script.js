import "./styles.css";

const wordEl = document.getElementById("word");
const WrongLettersEL = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const message = document.getElementById("message");
const wordReveal = document.getElementById("reveal-word");

const guessBtn = document.getElementById("guessbutton");
const letterInput = document.getElementById("guessinput");

const invalidLetterNotification = document.getElementById(
  "invalid-letter-notification-container"
);

const hangmanFigure = document.querySelectorAll(".hangman-body");

const words = ["boolean", "api", "ascii", "bug", "char", "objects", "class", "code", "compilation",
   "data", "char", "algorithm", "argument",  "unit", "testing", "bytecode", "character", "refactor", "comment"];

let wordsLen = words.length;

let generatedWord = words[Math.floor(Math.random() * wordsLen)];

const checkLetter = /^[A-Za-z]+$/;

const correctLetters = [];
const wrongLetters = [];

//  Words display
function displayWord() {
  wordEl.innerHTML = `
        ${generatedWord
          .split("")
          .map(
            (letter) =>
              `<span class="letter"> ${
                correctLetters.includes(letter) ? letter : ""
              }</span>`
          )
          .join("")}`;
  const innerword = wordEl.innerText.replace(/\n/g, "");
  if (innerword === generatedWord) {
    message.innerText = "Yay!! You won. 😆";
    wordReveal.innerText = "";
    popup.style.display = "flex";
  }
}

// Repeated Letter Notifications
function showNotification() {
  notification.classList.add("show");
  // notification.style.display ='flex';

  setTimeout(() => {
    notification.classList.remove("show");
    // notification.style.display ='none';
  }, 1000);
}

// Non letter notification
function invalidNotification() {
  invalidLetterNotification.classList.add("show");
  // invalidLetterNotification.style.display ='flex';
  setTimeout(() => {
    invalidLetterNotification.classList.remove("show");
    // invalidLetterNotification.style.display ='none';
  }, 1000);
}

// Wrong letters
function updateWrongLetters() {
  WrongLettersEL.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  hangmanFigure.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if you lose
  if (wrongLetters.length === hangmanFigure.length) {
    message.innerText = "It's quite sad you lost. 😬💔";
    wordReveal.innerText = `the word was : ${generatedWord}`;
    popup.style.display = "flex";
  }
}

// Guess button Event
guessBtn.addEventListener("click", () => {
  let wordInput = letterInput.value.toLowerCase();
  if (wordInput.match(checkLetter)) {
    if (generatedWord.includes(wordInput)) {
      if (!correctLetters.includes(wordInput)) {
        correctLetters.push(wordInput);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(wordInput)) {
        wrongLetters.push(wordInput);

        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  } else {
    invalidNotification();
  }
  letterInput.value = "";
});

// Play again Event
playAgainBtn.addEventListener("click", () => {
  letterInput.value = "";
  correctLetters.splice(0);
  wrongLetters.splice(0);

  generatedWord = words[Math.floor(Math.random() * wordsLen)];

  displayWord();
  updateWrongLetters();

  popup.style.display = "none";
});

displayWord();
