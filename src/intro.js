import html from "./intro.html";

const Intro = (innerScreen) => {
  innerScreen.innerHTML = html;

  let countdownEl = document.querySelector("#countdown");
  countdownEl.style.display = "flex";
  var countdownNumberEl = document.getElementById("countdown-number");
  var countdown = 3;

  countdownNumberEl.textContent = countdown;

  let cdTimer = setInterval(function () {
    countdown = --countdown <= 0 ? 3 : countdown;

    countdownNumberEl.textContent = countdown;
  }, 1500);

  return new Promise((resolve) => {
    setTimeout(() => {
      clearInterval(cdTimer);
      resolve("hi bitches");
      //helloSequence(countdownEl);
    }, 4500);
  });
};

export default Intro;
