import html from "./slide3.html";
import "./slide3.css";
import "devicon";
import Vara from "vara";

const Slide3 = (innerScreen) => {
  innerScreen.innerHTML = html;
  const mySkills = document.querySelector(".my-skills");

  const randArray = (n) => {
    let count = [];
    let array = [];

    for (let i = 0; i < n; i++) {
      count.push(i + 1);
    }

    for (let i = 0; i < n; i++) {
      let rand = Math.floor(Math.random() * count.length);
      array.push(count.splice(rand, 1)[0]);
    }

    return array;
  };

  let text = new Vara(
    ".skills-text",
    "./assets/font.json",
    [
      {
        text: "My skills and tools...",
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

  return new Promise((resolve) => {
    text.animationEnd(() => {
      let length = mySkills.children.length;
      let rArray = randArray(length);
      for (let i = 0; i < length; i++) {
        setTimeout(() => {
          mySkills.children[rArray[i] - 1].style.opacity = "100%";
        }, i * 500);
      }

      setTimeout(
        () => {
          resolve("slide3");
        },
        500 * length + 2000
      );
    });
  });
};

export default Slide3;
