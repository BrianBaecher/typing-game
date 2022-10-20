import { kurtSentences } from "./kurtSentences.js";

const button = document.querySelector(".startButton");
const userText = document.querySelector("#userText");
const goalDisplay = document.querySelector("#targetText");
const validIndicator = document.querySelector("#validIndicator");

let retArr = [];
let running = false;

button.addEventListener("click", buttonClick);

let entryCount = 0;
function textInputHandler(e) {
  validIndicator.style.animation = "";
  if (
    running === true &&
    e.key.length === 1 &&
    goalDisplay.textContent[entryCount] ===
      e.key /*&& e.key.match(/[A-Za-z.,]/)*/
  ) {
    console.log("good input");
    animValid();
    retArr.push(e.key);
    entryCount++;
    // ----- DELETE THIS FOR IT TO WORK
    // was trying to get it to turn green after correct
    // char was entered
    // ----
  } else if (
    goalDisplay.textContent[entryCount] !== e.key &&
    e.key !== "Shift" &&
    e.key !== "Backspace"
  ) {
    animInvalid();
  }
  if (e.key === "Backspace") {
    retArr = retArr.slice(0, retArr.length - 1);
    entryCount--;
  }
  userText.textContent = retArr.join("");
  if (retArr.join("") === goalDisplay.textContent) {
    running = false;
    userText.textContent = "finish";
    window.removeEventListener("keydown", textInputHandler);
    button.addEventListener("click", buttonClick);
    entryCount = 0;
  }
}
function buttonClick() {
  if (!running) {
    let goal = kurtSentences[Math.floor(Math.random() * 5)];
    goalDisplay.textContent = goal;
    running = true;
    userText.textContent = "begin";
    retArr = [];
    window.addEventListener("keydown", textInputHandler);
    button.removeEventListener("click", buttonClick);
  }
}

function animValid() {
  validIndicator.style.background = "green";
  // very unclear to me how this works
  // reference link: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Tips
  validIndicator.className = "box";
  requestAnimationFrame((time) => {
    requestAnimationFrame((time) => {
      validIndicator.className = "box changing";
    });
  });
}

function animInvalid() {
  validIndicator.style.background = "red";
  // very unclear to me how this works
  // reference link: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Tips
  validIndicator.className = "box";
  requestAnimationFrame((time) => {
    requestAnimationFrame((time) => {
      validIndicator.className = "box changing";
    });
  });
}
