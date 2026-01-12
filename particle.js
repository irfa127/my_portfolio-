// Typewriter Effect
const content = document.getElementById("typewriter-text");

const list = [
  "Full Stack Trainee",
  "Responsive Designer",
  "Creative Thinker",
  "Problem Solver",
];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function showText() {
  if (!content) return;

  const currentWord = list[wordIndex];

  if (isDeleting) {
    content.textContent = "I am a " + currentWord.slice(0, letterIndex - 1);
    letterIndex--;
  } else {
    content.textContent = "I am a " + currentWord.slice(0, letterIndex + 1);
    letterIndex++;
  }

  // Speed logic
  let typeSpeed = isDeleting ? 100 : 200;

  if (!isDeleting && letterIndex === currentWord.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % list.length;
  }

  setTimeout(showText, typeSpeed);
}

document.addEventListener("DOMContentLoaded", showText);

/* particles config */

/* particles config */
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": { "enable": true, "value_area": 800 }
    },
    // Color matches original style intent
    "color": { "value": "#777777" },
    "shape": {
      "type": "circle",
      "stroke": { "width": 0, "color": "#000000" },
      "polygon": { "nb_sides": 5 },
      "image": { "src": "img/github.svg", "width": 100, "height": 100 }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#777777",
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": true, "mode": "push" },
      "resize": true
    },
    "modes": {
      "grab": { "distance": 400, "line_linked": { "opacity": 1 } },
      "bubble": {
        "distance": 400, "size": 40, "duration": 2,
        "opacity": 8, "speed": 3
      },
      "repulse": { "distance": 200, "duration": 0.4 },
      "push": { "particles_nb": 4 },
      "remove": { "particles_nb": 2 }
    }
  },
  "retina_detect": true
});
