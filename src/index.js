import "./style.css";
import json from "./assets/font.json";
import Vara from "vara";
import lobster from "./assets/lobster.jpg";

const container = document.querySelector(".container");
const pd = document.querySelector("#pulldown");
const pdCircle = document.querySelector("#circle");
const sWrapper = document.querySelector(".screen-wrapper");
const clearLine = document.querySelector(".clear-line");
const domScreen = document.querySelector(".screen");
const innerWrapper = document.querySelector(".inner-wrapper");
const innerScreen = document.querySelector(".inner-screen");

let pdSelected = false;

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

const Screen = () => {
  //as percentage
  let height = -90;
  let rInterval;
  let eInterval;
  let firstTry = true;

  const setY = (val) => {
    height = boundY(val);
    console.log(height);
    if (
      height >=
      -40 - (100 * pd.getBoundingClientRect().height) / container.offsetHeight
    ) {
      expand();
    }

    sWrapper.style.transform = `translateY(${height}%)`;
  };

  const boundY = (val) => {
    return Math.min(0, Math.max(-90, Math.round(val)));
  };

  const retract = (wasTrue) => {
    if (firstTry && wasTrue) {
      let text = new Vara(
        ".pulldown-text2",
        "./assets/font.json",
        [
          {
            text: "Harder!",
          },
        ],
        {
          fontSize: 24,
          strokeWidth: 4,
          letterSpacing: 2,
          color: "whitesmoke",
        }
      );

      text.animationEnd(() => {
        clearLine.style.clipPath = "inset(0 0% 0 0)";
      });
      firstTry = false;
    }

    if (rInterval == undefined) {
      rInterval = setInterval(() => {
        height -= 1;

        if (height <= -90) {
          clearRetract();
        }

        setY(height);
      }, 1000 / 60);
    }
  };

  const expand = () => {
    pdCircle.removeEventListener("mousedown", handleDown);
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleUp);

    if (eInterval == undefined) {
      eInterval = setInterval(() => {
        height += 1;

        if (height >= 0) {
          clearLine.style.clipPath = "inset(0 0 0 100%)";
          startVideo();
          clearExpand();
        } else {
          setY(height);
        }
      }, 1000 / 60);
    }
  };

  const startVideo = () => {
    //should be 1000 but setting to 10 for debug
    setTimeout(turnOffLights, 10);
  };

  const turnOffLights = () => {
    [...container.children].forEach((c) => {
      c.style.filter = "brightness(50%)";
    });
    //should be 1000 but setting to 10 for debug
    setTimeout(turnOnProjector, 10);
  };

  const turnOnProjector = () => {
    innerWrapper.style.display = "flex";
    innerWrapper.style.filter = "brightness(100%)";
    console.log("now");
    setTimeout(() => {
      innerScreen.classList.add("active");
    }, 10);
    //should be 500 but setting to 10 for debug
    setTimeout(timeSequence, 10);
  };

  const timeSequence = () => {
    let countdownEl = document.querySelector("#countdown");
    countdownEl.style.display = "flex";
    var countdownNumberEl = document.getElementById("countdown-number");
    var countdown = 3;

    countdownNumberEl.textContent = countdown;

    let cdTimer = setInterval(function () {
      countdown = --countdown <= 0 ? 3 : countdown;

      countdownNumberEl.textContent = countdown;
    }, 1500);

    //should be 4500 but setting to 1 for debug
    setTimeout(() => {
      clearInterval(cdTimer);
      helloSequence(countdownEl);
    }, 10);
  };

  const helloSequence = (cdEl) => {
    cdEl.style.display = "none";
    const helloEl = document.querySelector(".hello-sequence");
    helloEl.style.display = "flex";
    let img = helloEl.querySelector("img");
    img.src = lobster;

    setTimeout(() => {
      let helloText = new Vara(
        ".one",
        "./assets/font.json",
        [
          {
            text: "Hello! My name is Christopher Hall.",
            textAlign: "center",
            width: 225,
            duration: 2000,
          },
        ],
        {
          fontSize: 24,
          strokeWidth: 4,
          letterSpacing: 2,
          color: "#3fb152",
        }
      );

      helloText.animationEnd(() => {
        img.style.opacity = "100%";
        helloEl.querySelector(".arrow").style.animation =
          "arrowEntry 1s linear 1 forwards";
        setTimeout(() => {
          let devText = new Vara(
            ".dev-text",
            "./assets/font.json",
            [
              {
                text: "Aspiring Full Stack Developer",
                textAlign: "center",
                width: 200,
                duration: 500,
              },
            ],
            {
              fontSize: 10,
              strokeWidth: 4,
              letterSpacing: 2,
              color: "#3fb152",
            }
          );

          devText.animationEnd(() => {
            setTimeout(() => {
              secondslide(helloEl);
            }, 1500);
          });
        }, 1000);
      });
      //helloEl.querySelector(".one").style.transform = "translateX(0px)";
    }, 500);
  };

  const secondslide = (helloEl) => {
    helloEl.style.opacity = "0%";
    setTimeout(() => {
      helloEl.style.display = "none";
      const proj = document.querySelector(".projects-sequence");
      proj.style.display = "flex";
    }, 1000);
  };

  const clearRetract = () => {
    clearInterval(rInterval);
    rInterval = undefined;
  };

  const clearExpand = () => {
    clearInterval(eInterval);
    eInterval = undefined;
  };

  return { setY, retract, clearRetract };
};

let screen = Screen();

pdCircle.addEventListener("mousedown", handleDown);

function handleDown(e) {
  pdSelected = true;
  screen.clearRetract();
}

document.addEventListener("mousemove", handleMove);

function handleMove(e) {
  if (pdSelected) {
    screen.setY(
      -90 +
        (100 * (e.clientY - pd.getBoundingClientRect().height)) /
          container.offsetHeight
    );
  }
}

document.addEventListener("mouseup", handleUp);

function handleUp(e) {
  let wasTrue = pdSelected;
  pdSelected = false;

  screen.retract(wasTrue);
}

new Vara(
  ".pulldown-text",
  "./assets/font.json",
  [
    {
      text: "Pull Down",
    },
  ],
  {
    fontSize: 24,
    strokeWidth: 4,
    letterSpacing: 2,
    color: "whitesmoke",
  }
);
