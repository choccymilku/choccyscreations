const sentences = [
  "i'm choccy",
  "web dev, editor, designer",
  "find out more up there"
];

const introDiv = document.getElementById('intro');
const menuWingTyper = document.getElementById('menu_wing');
const aboutWingTyper = document.getElementById('about_wing');
const otherWingTyper = document.getElementById('other_wing');

let playSounds = true; // Variable to control sound playback
let typingTimeout; // Variable to hold the typing timeout

function typeSentence(sentence) {
  const words = sentence.split(' ');
  let index = 0;

  function typeWord() {
    if (index < words.length) {
      const word = words[index];

      introDiv.innerHTML += word + ' ';

      if (playSounds) {
        playAudio('./type.mp3');
      }

      index++;
      typingTimeout = setTimeout(typeWord, 150); // Fixed speed of 150ms for each word
    } else {
      introDiv.innerHTML += '<br>'; // Add a line break after each sentence

      if (sentence === sentences[sentences.length - 1]) {
        // Add animation class to each wing after typing the last sentence
        setTimeout(() => {
          menuWingTyper.classList.add('animate-wing');
        }, 100);
        setTimeout(() => {
          aboutWingTyper.classList.add('animate-wing');
        }, 200);
        setTimeout(() => {
          otherWingTyper.classList.add('animate-wing');
        }, 300);
      }
    }
  }

  typeWord();
}

function playAudio(audioFile) {
  const audio = new Audio(audioFile);
  audio.play();
}

function playIntro() {
  let sentenceIndex = 0;
  introDiv.innerHTML = ''; // Clear the div initially

  function playNextSentence() {
    if (sentenceIndex < sentences.length) {
      const sentence = sentences[sentenceIndex];
      typeSentence(sentence);

      sentenceIndex++;
      setTimeout(playNextSentence, 1500); // Wait 1500ms between sentences
    }
  }

  playNextSentence();
}

function skipTyping() {
  clearTimeout(typingTimeout); // Clear the typing timeout
  playSounds = false; // Disable sound playback
  introDiv.innerHTML = ''; // Clear the div initially

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    introDiv.innerHTML += sentence + '<br>'; // Display the entire sentence at once
  }

  // Add animation class to each wing after typing the last sentence
}

menuWingTyper.addEventListener('click', () => {
  skipTyping();
  document.getElementById('intro').style.display = 'none'; // Hide the element with ID "intro"
  document.getElementById('intro_full').style.display = 'block'; // Show the element with ID "intro_full"
});

aboutWingTyper.addEventListener('click', () => {
  skipTyping();
  document.getElementById('intro').style.display = 'none'; // Hide the element with ID "intro"
  document.getElementById('intro_full').style.display = 'block'; // Show the element with ID "intro_full"
});

otherWingTyper.addEventListener('click', () => {
  skipTyping();
  document.getElementById('intro').style.display = 'none'; // Hide the element with ID "intro"
  document.getElementById('intro_full').style.display = 'block'; // Show the element with ID "intro_full"
});

playIntro();