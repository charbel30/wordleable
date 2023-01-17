const body = document.getElementsByClassName("original");
let lastInput;
let rows = 0;
correct = false;
const black = "rgb(24, 24, 26)";
const light = "rgb(220, 204, 163)";
let row = document.querySelectorAll(".words ");
let inputs = row[rows].querySelectorAll("input");
let userword = "";
let inputIndex = 0;

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

document
  .querySelector(".dark-mode-toggle")
  .addEventListener("click", toggleDarkMode);

///////////////////////////

inputs[0].focus();

let enterPressed = false;
for (let i = 0; i < row.length; i++) {
  let inputs = row[i].querySelectorAll("input");

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute("tabindex", "-1");
  }

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.pointerEvents = "none";
  }

  inputs.forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (rows < row.length) {
        inputs = row[rows].querySelectorAll("input");
      }
      input.addEventListener("input", (event) => {
        lastInput = event.target;
      });
      if (isLetter(event.key)) {
        handleLetter(event, input);
        lastInput = event.target;
      } else if (event.key === "Backspace") {
        handleBackspace(event, input);
      } else if (event.key === "Enter" && userword.length === 5) {
        nextLine(event, input);
        checkWord();
        enterPressed = true;
      } else {
        handleOther(event);
      }
    });
  });
}

document.body.addEventListener("keyup", () => {
  if (enterPressed && rows < row.length) {
    if (rows < row.length - 1) {
      inputs = row[rows].querySelectorAll("input");
      rows++;
    }

    enterPressed = false;
  }
});

document.body.addEventListener("click", () => {

  console.log(inputIndex);
  if (lastInput && inputIndex !== 0 && rows < row.length - 1) {
    lastInput.focus();
  }
  else {
    inputs[0].focus();
  }
});

async function GetWord() {
  const promise = await fetch("https://words.dev-apis.com/word-of-the-day");
  const processedResponse = await promise.json();
  const word = processedResponse.word;

  return word;
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function handleBackspace(event, input) {
  if (event.key === "Backspace" && input.value === "") {
    event.preventDefault();
    lastInput = event.target;
    const input = event.target;
    const inputValue = input.value;
    inputIndex = Array.from(inputs).indexOf(input);
    if (inputValue === "" && userword !== "") {
      userword = userword.slice(0, inputIndex - 1) + userword.slice(inputIndex);
    }

    if (inputIndex === 0 && rows > 0) {
      userword = "";
    }
    // userword = userword.substring(0, userword.length - 1);
    if (inputIndex === 0) {
      userword = "";
    }
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
  const inputValue = input.value;
  inputIndex = Array.from(inputs).indexOf(input);

  if (userword.length < 5) {
    if (inputValue !== "") {
      userword =
        userword.slice(0, inputIndex) +
        inputValue +
        userword.slice(inputIndex + 1);
    }
  }
  if (userword.length === 5) {
    userword = userword.slice(0, -1) + inputValue;
  }
  console.log(inputIndex);
  console.log(userword);

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
const WORD = GetWord().then((word) => {
  return word;
});
async function nextLine(event, target) {
  if (event.key === "Enter" && target.value !== "" && rows < row.length) {
    inputIndex = 0;
    event.preventDefault();
    const nextrow = event.target.closest(".words").nextElementSibling;
    const nextword = nextrow && nextrow.querySelector("input");
    inputs = row[rows].querySelectorAll("input");
   
    if (nextword) {
      nextword.focus();
    }

  }
}

async function checkWord() {
  console.log(await GetWord());
  if (userword === (await GetWord()) && userword.length === 5) {
    if (rows < row.length - 1) {
      inputs[rows].parentNode.parentNode.classList.add("correct");
    } else {
      inputs[rows - 1].parentNode.parentNode.classList.add("correct");
    }
    if (rows < row.length ) {
      inputs = row[rows].querySelectorAll("input");
    }
  } else {
    console.log("incorrect");
  }
  inputs = row[rows].querySelectorAll("input");
  userword = "";
  inputIndex = 0;
}

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
