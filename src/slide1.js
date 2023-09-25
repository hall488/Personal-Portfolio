import html from "./slide1.html";
import lobster from "./assets/lobster.jpg";
import Vara from "vara";

const Slide1 = (innerScreen) => {
  innerScreen.innerHTML = html;
  const helloEl = document.querySelector(".hello-sequence");
  helloEl.style.display = "flex";
  let img = helloEl.querySelector("img");
  img.src = lobster;

  return new Promise((resolve) => {
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
              resolve("First slide done");
            }, 1500);
          });
        }, 1000);
      });
      //helloEl.querySelector(".one").style.transform = "translateX(0px)";
    }, 500);
  });
};

export default Slide1;
