
const body = document.getElementsByClassName("original");
let lastInput;
const black = "rgb(24, 24, 26)";
const light = "rgb(220, 204, 163)";
const inputs = document.querySelectorAll("input");
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".dark-mode-toggle").classList.toggle("active");
  document.querySelector("main").classList.toggle("dark-modes");
}
//check if dark mode is on on page load and add active class to toggle button if it is on
document.media = window.matchMedia("(prefers-color-scheme: dark)");

if (document.media.matches) {
  document.body.classList.add("dark-mode");
  document.querySelector(".dark-mode-toggle").classList.add("active");
  document.querySelector("main").classList.add("dark-modes");
}

//i want to add dark mode when i hover the button and when i unhover it goes back to normal  if it contains active class
document
  .querySelector(".dark-mode-toggle")
  .addEventListener("click", toggleDarkMode);

///////////////////////////

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function handleBackspace(event, input) {
  if (event.key === "Backspace" && input.value === "") {
    event.preventDefault();
    lastInput = event.target;
    const previousDiv = input.parentNode.previousElementSibling;
    if (previousDiv) {
      const previousInput = previousDiv.querySelector("input");
      previousInput.focus();
      previousInput.value = "";
    }
  }
}

function handleLetter(event, input) {
  event.preventDefault();
  input.value = event.key;
  const nextDiv = input.parentNode.nextElementSibling;
  if (nextDiv) {
    const nextInput = nextDiv.querySelector("input");
    nextInput.focus();
  }
}

function handleOther(event) {
  // Prevent the input of any non-letter characters
  if (event.key.length === 1) {
    event.preventDefault();
  }
}

function nextLine(event, target) {
  if (event.key === "Enter" && target.value !== "") {
    event.preventDefault();
    const nextrow = event.target.closest(".words").nextElementSibling;
    const nextword = nextrow && nextrow.querySelector("input");
    if (nextword) {
      nextword.focus();
    }
  }
}

for (let i = 1; i < inputs.length; i++) {
  inputs[i].style.pointerEvents = "none";
}

inputs[0].focus();
for (let i = 1; i < inputs.length; i++) {
  inputs[i].setAttribute("tabindex", "-1");
}

inputs.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    input.addEventListener("input", () => {
      lastInput = input;
    });
    input.addEventListener("input", (event) => {
      lastInput = event.target;
    });
    if (isLetter(event.key)) {
      handleLetter(event, input);
      lastInput = event.target;
    } else if (event.key === "Backspace") {
      handleBackspace(event, input);
    } else if (event.key === "Enter") {
      nextLine(event, input);
    } else {
      handleOther(event);
    }
  });
});
document.body.addEventListener("click", () => {
  if (lastInput) {
    lastInput.focus();
  } else {
    inputs[0].focus();
  }
});


async function GetWord() {
  const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
  const processedResponse = await promise.json();
  const word = processedResponse.word;

 
  return word;
  
}
const WORD = GetWord().then((word) => {
  console.log(word);
 
 });


 

 


//how to make a POST request
/*async function PostWord() {
  word = GetWord()
  const promise = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word: "" }),
  });
  const processedResponse = await promise.json();

  console.log(processedResponse);

}
PostWord()
*/






