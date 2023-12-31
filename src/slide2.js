import html from "./slide2.html";
import "./slide2.css";
import Vara from "vara";

const Slide2 = (innerScreen) => {
  innerScreen.innerHTML = html;

  const leftSlider = innerScreen.querySelector(".left");
  const rightSlider = innerScreen.querySelector(".right");

  const moveProjects = () => {
    leftSlider.style.animation = "slideLeft 10s linear 1 forwards";
    rightSlider.style.animation = "slideRight 10s linear 1 forwards";
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      const proj = document.querySelector(".projects-sequence");
      proj.style.display = "flex";

      let textSize;
      let mobileCheck = window.matchMedia("(max-width: 600px)");

      function handleMobile(e) {
        if (e.matches) {
          textSize = 16;
        } else {
          textSize = 24;
        }
      }

      handleMobile(mobileCheck);

      let text = new Vara(
        ".proj-text",
        "./assets/font.json",
        [
          {
            text: "What I have done so far...",
            textAlign: "center",
            duration: 2000,
            y: 10,
          },
        ],
        {
          fontSize: textSize,
          strokeWidth: 4,
          letterSpacing: 2,
          color: "#3fb152",
        }
      );

      text.animationEnd(moveProjects);

      setTimeout(() => {
        resolve("Second Done");
      }, 13500);
    }, 1000);
  });
};

export default Slide2;
