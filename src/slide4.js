import html from "./slide4.html";
import "./slide4.css";
import Vara from "vara";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/brands";

const Slide4 = (innerScreen) => {
  innerScreen.innerHTML = html;
  const myInterests = document.querySelector(".my-interests");

  let text = new Vara(
    ".interests-text",
    "./assets/font.json",
    [
      {
        text: "My interests...",
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

  const text3 = (resolve) => {
    myInterests.children[2].style.opacity = "100%";
    let text = new Vara(
      ".interests-li-text3",
      "./assets/font.json",
      [
        {
          text: "Brazilian Jiu Jitsu",
          y: 10,
        },
      ],
      {
        textAlign: "center",
        duration: 2000,
        fontSize: 16,
        strokeWidth: 4,
        letterSpacing: 2,
        color: "#3fb152",
      }
    );

    text.animationEnd(() => {
      setTimeout(() => {
        resolve("slide4");
      }, 1000);
    });
  };

  const text2 = (resolve) => {
    myInterests.children[1].style.opacity = "100%";
    let text = new Vara(
      ".interests-li-text2",
      "./assets/font.json",
      [
        {
          text: "Game Development",
          y: 10,
        },
      ],
      {
        textAlign: "center",
        duration: 2000,
        fontSize: 16,
        strokeWidth: 4,
        letterSpacing: 2,
        color: "#3fb152",
      }
    );

    text.animationEnd(() => {
      text3(resolve);
    });
  };

  const text1 = (resolve) => {
    myInterests.children[0].style.opacity = "100%";
    let text = new Vara(
      ".interests-li-text1",
      "./assets/font.json",
      [
        {
          text: "Web Development",
          y: 10,
        },
      ],
      {
        textAlign: "center",
        duration: 2000,
        fontSize: 16,
        strokeWidth: 4,
        letterSpacing: 2,
        color: "#3fb152",
      }
    );

    text.animationEnd(() => {
      text2(resolve);
    });
  };

  return new Promise((resolve) => {
    text.animationEnd(() => {
      text1(resolve);
    });
  });
};

export default Slide4;
