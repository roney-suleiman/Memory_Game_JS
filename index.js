"use strict";

// KONSTANTEN / VARIABLEN
const elements = {};
elements.score = 0;
let count = 0;
let timer = '';
let time = "";
// FUNKTIONEN

const appendEventlisteners = () => {
  let start = elements.start.addEventListener("click", domCreating);
};

// dom erzeugen, Abhängig von benuzereingabe (Select element).
let domCreating = () => {

  clearInterval(timer);

  let sec = 0,
    min = 0;
    time ='';
  elements.timer = document.querySelector("#timer");
  timer = setInterval(() => {
    let newSec = sec < 10 ? `0${sec}` : sec;
    let newMin = min < 10 ? `0${min}` : min;
    time = `${newMin} : ${newSec}`;
    elements.scoreTimer.innerHTML = time;
    sec++;
    if (sec == 60) {
      sec = 0;
      min++;
    }
  }, 1000);



  window.scrollTo(0, document.body.scrollHeight);
  elements.container.innerHTML = "";
  elements.score = 0;
  elements.scoreSpan.innerHTML = elements.score;
  let rand = choose(elements.select.value);
  elements.front = [];
  elements.card = [];
  for (let i = 0; i < elements.select.value; i++) {
    elements.card[i] = dom.create(false, elements.container, "div", "cell");
    elements.front[i] = dom.create(
      false,
      elements.card[i],
      "div",
      "front show"
    );
    elements.back = dom.create(false, elements.card[i], "div", "back");

    if (elements.select.value == 12) {
      elements.img = dom.create(
        false,
        elements.front[i],
        "img",
        false,
        `images12/${rand[i]}.png`,
        false,
        false
      );
    } else {
      elements.img = dom.create(
        false,
        elements.front[i],
        "img",
        false,
        `images20/${rand[i]}.png`,
        false,
        false
      );
    }
  }
  showForSecond();
  clicking();
};

// für die Alle Fotos nur für 1 sekunde anzeigen bei Anfang das Spiel
let showForSecond = () => {
  setTimeout(() => {
    for (let i = 0; i < elements.front.length; i++) {
      elements.front[i].classList.remove("show");
    }
  }, 1000);
};

// kliken auf die zelle, und eine Array mit die zwei aufeinanderfolgenden Klicks Elements erzeugen.
let clicking = () => {
  count = 0;
  handelStorage();
  for (let i = 0; i < elements.card.length; i++) {
    elements.card[i].addEventListener("click", () => {
      elements.front[i].classList.add("flip");
      elements.flippedCards = document.querySelectorAll(".flip");
      if (elements.flippedCards.length == 2) {
        elements.score += 1;
        elements.scoreSpan.innerHTML = elements.score;
        check(elements.flippedCards[0], elements.flippedCards[1]);
      }
      if (elements.front[i].classList.contains("found")) {
        count++;
        if (elements.select.value == 12) {
          if (count == 6) {
            if (elements.score < localStorage.getItem("top12")) {
              localStorage.setItem("top12", elements.score);
              elements.bestScoreSpan.innerHTML = localStorage.getItem("top12");

              localStorage.setItem("timer_top12", time);
              elements.bestScoreTimer.innerHTML = localStorage.getItem("timer_top12");

            }
            elements.win.play();
            clearInterval(timer);
          }
        }
        if (elements.select.value == 20) {
          if (count == 10) {
            if (elements.score < localStorage.getItem("top20")) {
              localStorage.setItem("top20", elements.score);
              elements.bestScoreSpan.innerHTML = localStorage.getItem("top20");

              localStorage.setItem("timer_top20", time);
              elements.bestScoreTimer.innerHTML = localStorage.getItem("timer_top20");

            }
            elements.win.play();
            clearInterval(timer);
          }
        }
      }
    });
  }
};

// die Array mit 2 Elements Prufen ob die Fotos die drine sind, sind gleich oder nicht
const check = (firstCard, secondCard) => {
  if (
    firstCard.children[0].getAttribute("src") ==
    secondCard.children[0].getAttribute("src")
  ) {
    elements.correct.play();
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    firstCard.classList.add("found");
    secondCard.classList.add("found");
  } else {
    elements.unSuccess.play();
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
    }, 500);
  }
};

// Speicherprozess in Localstorage beim gewinn
let handelStorage = () => {
  if (elements.select.value == 12) {
    if (localStorage.getItem("top12")) {
      elements.bestScoreSpan.innerHTML = localStorage.getItem("top12");
    } else {
      localStorage.setItem("top12", elements.score + 50);
    }

    if(localStorage.getItem('timer_top12')) {
      elements.bestScoreTimer.innerHTML = localStorage.getItem('timer_top12')
    } else {
      elements.bestScoreTimer.innerHTML = '05 : 00'
    }

  }
  if (elements.select.value == 20) {
    if (localStorage.getItem("top20")) {
      elements.bestScoreSpan.innerHTML = localStorage.getItem("top20");
    } else {
      localStorage.setItem("top20", elements.score + 50);
    }

    if(localStorage.getItem('timer_top20')) {
      elements.bestScoreTimer.innerHTML = localStorage.getItem('timer_top20')
    } else {
      elements.bestScoreTimer.innerHTML = '05 : 00'
    }

  }
};

let setTimer = () => {};

const domMapping = () => {
  elements.container = document.querySelector(".container");
  elements.select = document.querySelector("select");
  elements.scoreSpan = document.querySelector("#score");
  elements.bestScoreSpan = document.querySelector("#topScore");
  elements.start = document.querySelector("#btnStart");
  elements.scoreTimer = document.querySelector("#score_timer");
  elements.bestScoreTimer = document.querySelector("#best_score_timer");
  // elements.wrong = new Audio('./sounds/wrong.mp3');
  elements.unSuccess = new Audio('./sounds/wrong.mp3');
  elements.correct = new Audio('./sounds/correct.mp3');
  elements.win = new Audio('./sounds/win2.mp3');
};

const init = () => {
  domMapping();
  appendEventlisteners();
  handelStorage();
};

// INIT
document.addEventListener("DOMContentLoaded", init);
