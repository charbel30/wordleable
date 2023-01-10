const body = document.getElementsByClassName('header');

const black = 'rgb(24, 24, 26)';
const light = 'rgb(220, 204, 163)'


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.dark-mode-toggle').classList.toggle('active');
    document.querySelector('main').classList.toggle('dark-modes');
    
  }
  //check if dark mode is on on page load and add active class to toggle button if it is on 
  document.media = window.matchMedia('(prefers-color-scheme: dark)');

  if (document.media.matches) {
    document.body.classList.add('dark-mode');
    document.querySelector('.dark-mode-toggle').classList.add('active');
    document.querySelector('main').classList.add('dark-modes');
  }

//i want to add dark mode when i hover the button and when i unhover it goes back to normal  if it contains active class  
  document.querySelector('.dark-mode-toggle').addEventListener('click', toggleDarkMode);
  
 ///////////////////////////
 
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function handleBackspace(event, input) {
  if (event.key === "Backspace" && input.value === "") {
    event.preventDefault();
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

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
  input.addEventListener("keydown", event => {
    if (isLetter(event.key)) {
      handleLetter(event, input);
    } else if (event.key === "Backspace") {
      handleBackspace(event, input);
    } else {
      handleOther(event);
    }
  });
});


