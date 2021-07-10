const loginButton = document.querySelector(".login-button");
const formBox = document.getElementById("form-box");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  const fields = [...document.querySelectorAll(".input-block input")];

  fields.forEach((field) => {
    if (field.value === "") {
      formBox.classList.add("no-no");
    }
  });

  const checkError = document.querySelector(".no-no");
  if (checkError) {
    checkError.addEventListener("animationend", (event) => {
      if (event.animationName === "no-no") {
        checkError.classList.remove("no-no");
      }
    });
  } else {
    loginButton.classList.add("pressed");
    formBox.classList.add("form-hidden");
  }
});

const bubbles = document.querySelector("ul.squares");

for (let i = 0; i < 15; i++) {
  const li = document.createElement("li");

  const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

  const size = random(30, 60);
  const postion = random(0, 85);
  const delay = random(0.1, 10);
  const duration = random(12, 24);
  const borderRadius = random(0, 100);

  li.style.width = `${size}px`;
  li.style.height = `${size}px`;
  li.style.left = `${postion}vw`;
  li.style.animationDelay = `${delay}s`;
  li.style.animationDuration = `${duration}s`;
  li.style.borderRadius = `${borderRadius}px`;
  li.style.animationTimingFunction = `cubic-bezier(${
    (Math.random(), Math.random(), Math.random(), Math.random())
  })`;

  bubbles.appendChild(li);
}
