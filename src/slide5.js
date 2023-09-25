import html from "./slide5.html";
import "./slide5.css";
import Vara from "vara";
import "devicon";

const Slide5 = (innerScreen) => {
  innerScreen.innerHTML = html;

  const icons = document.querySelector(".connect-icons");

  let text = new Vara(
    ".connect-text",
    "./assets/font.json",
    [
      {
        text: "Connect With Me On...",
        textAlign: "center",
        duration: 1000,
      },
    ],
    {
      fontSize: 24,
      strokeWidth: 4,
      letterSpacing: 2,
      color: "#3fb152",
    }
  );

  const fadeInConnections = (resolve) => {
    icons.style.opacity = "100%";
    setTimeout(() => {
      arrow.style.opacity = "100%";
      let closeText = new Vara(
        ".connect-end",
        "./assets/font.json",
        [
          {
            text: "Click here to end presentation",
            textAlign: "center",
            duration: 1000,
          },
        ],
        {
          fontSize: 12,
          strokeWidth: 4,
          letterSpacing: 2,
          color: "#3fb152",
        }
      );

      closeText.animationEnd(() => {
        document.querySelector(".connect-end").addEventListener("click", () => {
          resolve("slide5");
        });
      });
    });
  };

  return new Promise((resolve) => {
    text.animationEnd(() => {
      fadeInConnections(resolve);
    });
  });
};

export default Slide5;
