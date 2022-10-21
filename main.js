import { kurtSentences } from "./kurtSentences.js";
import { Stopwatch } from "./stopwatch.js";
const button = document.querySelector(".startButton");
const userText = document.querySelector("#userText");
const goalDisplay = document.querySelector("#targetText");
const validIndicator = document.querySelector("#validIndicator");
const newAccuracy = document.querySelector("#newAccuracy");
const newWPM = document.querySelector("#newWPM");

let retArr = [];
let running = false;
let entryCount = 0;
let invalidCount = 0;

let timer = new Stopwatch();

const stats = {
  accuracyArr: [],
  addAccuracy: function (x) {
    this.accuracyArr.push(x);
  },
  wpmArray: [],
  addWPM: function (x) {
    this.wpmArray.push(x);
  },
  avgAccuracy: function () {
    if (this.accuracyArr.length > 0) {
      return (
        this.accuracyArr.reduce((a, b) => +a + +b, 0) / this.accuracyArr.length
      );
    }
  },
  avgWPM: function (x) {
    console.log(this.wpmArray)
    if (this.wpmArray !== []) {
      return this.wpmArray.reduce((a, b) => +a + +b, 0) / this.wpmArray.length;
    }
  },
};

button.addEventListener("click", buttonClick);

function textInputHandler(e) {
  if (
    running === true &&
    e.key.length === 1 &&
    goalDisplay.textContent[entryCount] === e.key
  ) {
    console.log("good input");
    animValid();
    retArr.push(e.key);
    entryCount++;
  } else if (
    goalDisplay.textContent[entryCount] !== e.key &&
    e.key !== "Shift" &&
    e.key !== "Backspace"
  ) {
    animInvalid();
    invalidCount++;
    console.log(invalidCount);
  }
  if (entryCount === 1) {
    timer.start();
  }
  if (e.key === "Backspace") {
    retArr = retArr.slice(0, retArr.length - 1);
    entryCount--;
  }
  userText.textContent = retArr.join("");
  if (retArr.join("") === goalDisplay.textContent) {
    userText.textContent = "finish";
    timer.stop();
    console.log(timer.duration);
    displayWPM();
    running = false;
    displayAccuracy();
    window.removeEventListener("keydown", textInputHandler);
    button.addEventListener("click", buttonClick);
    entryCount = 0;
    invalidCount = 0;
    console.log(stats);
  }
}
function buttonClick() {
  if (!running) {
    timer.reset();
    running = true;
    newWPM.textContent = "";
    newAccuracy.textContent = "";
    let goal = kurtSentences[Math.floor(Math.random() * kurtSentences.length)];
    goalDisplay.textContent = goal;
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
  validIndicator.className = "box";
  requestAnimationFrame((time) => {
    requestAnimationFrame((time) => {
      validIndicator.className = "box changing";
    });
  });
}
function displayAccuracy() {
  const avgAccuracyDisplay = document.querySelector("#avgAccuracyDisplay");
  let acc = Math.round(
    (entryCount / (entryCount + invalidCount)) * 100
  ).toString();
  newAccuracy.textContent = acc;
  if (+acc >= 90) {
    newAccuracy.style.backgroundColor = "green";
  }
  if (+acc < 90 && +acc >= 75) {
    newAccuracy.style.backgroundColor = "yellow";
  }
  if (+acc < 75) {
    newAccuracy.style.backgroundColor = "red";
  }
  stats.addAccuracy(acc);
  avgAccuracyDisplay.textContent = Math.round(stats.avgAccuracy());
}
function displayWPM() {
  const avgWpmDisplay = document.querySelector("#avgWpmDisplay")
  let wpm = Math.round(
    goalDisplay.textContent.split(" ").length / (timer.duration / 60)
  );
  newWPM.textContent = wpm;
  stats.addWPM(wpm);
  console.log(stats.aywpmArrayay)
  avgWpmDisplay.textContent = Math.round(stats.avgWPM())
}