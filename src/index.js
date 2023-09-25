import "./style.css";
import json from "./assets/font.json";
import Vara from "vara";

import Intro from "./intro";
import Slide1 from "./slide1";
import Slide2 from "./slide2";
import Slide3 from "./slide3";
import Slide4 from "./slide4";
import Slide5 from "./slide5";

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

const Screen = () => {
  const container = document.querySelector(".container");
  const pd = document.querySelector("#pulldown");
  const pdCircle = document.querySelector("#circle");
  const sWrapper = document.querySelector(".screen-wrapper");
  const clearLine = document.querySelector(".clear-line");
  const domScreen = document.querySelector(".screen");
  const innerWrapper = document.querySelector(".inner-wrapper");
  const innerScreen = document.querySelector(".inner-screen");

  //as percentage
  let pdSelected = false;
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
    setTimeout(turnOffLights, 1000);
  };

  const turnOffLights = () => {
    [...container.children].forEach((c) => {
      c.style.filter = "brightness(50%)";
    });
    //should be 1000 but setting to 10 for debug
    setTimeout(turnOnProjector, 1000);
  };

  const turnOnProjector = () => {
    innerWrapper.style.display = "flex";
    innerWrapper.style.filter = "brightness(100%)";
    console.log("now");
    setTimeout(() => {
      innerScreen.classList.add("active");
    }, 10);
    //should be 500 but setting to 10 for debug
    setTimeout(async () => {
      console.log("start of async");
      // await Intro(innerScreen);
      // await Slide1(innerScreen);
      // await Slide2(innerScreen);
      // await Slide3(innerScreen);
      // await Slide4(innerScreen);
      await Slide5(innerScreen);
      innerScreen.style.opacity = "0%";
      setTimeout(endPresentation, 1000);
    }, 10);
  };

  const endPresentation = () => {
    [...container.children].forEach((c) => {
      c.style.filter = "brightness(100%)";
    });
    retract(false);
    setTimeout(() => {
      [...container.children].forEach((c) => {
        c.style.opacity = "0%";
      });

      setTimeout(() => {
        window.location.href = "http://google.com";
      }, 1000);
    }, 2000);
  };

  const clearRetract = () => {
    clearInterval(rInterval);
    rInterval = undefined;
  };

  const clearExpand = () => {
    clearInterval(eInterval);
    //eInterval = undefined;
  };

  pdCircle.addEventListener("mousedown", handleDown);

  function handleDown(e) {
    pdSelected = true;
    clearRetract();
  }

  document.addEventListener("mousemove", handleMove);

  function handleMove(e) {
    if (pdSelected) {
      setY(
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

    retract(wasTrue);
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

  return { setY, retract, clearRetract };
};

let screen = Screen();
