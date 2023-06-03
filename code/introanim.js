// Get the intro-toggle element
const introToggle = document.getElementById('intro-toggle');

// Check if the value is already set in localStorage
if (localStorage.getItem('animateWing') === 'true') {
  // Add the animate-wing class if the value is true
  addAnimateWingClass();
  introToggle.innerHTML = 'skip';
} else {
  introToggle.innerHTML = 'play';
}

// Toggle the value in localStorage when intro-toggle is clicked
introToggle.addEventListener('click', function() {
  const currentValue = localStorage.getItem('animateWing');

  if (currentValue === 'true') {
    localStorage.setItem('animateWing', 'false');
    removeAnimateWingClass();
    introToggle.innerHTML = 'play';
  } else {
    localStorage.setItem('animateWing', 'true');
    addAnimateWingClass();
    introToggle.innerHTML = 'skip';
  }
});

// Function to add animate-wing class to elements
function addAnimateWingClass() {
  const elements = document.querySelectorAll('#menu_wing, #about_wing, #other_wing');
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('animate-wing');
    }, index * 100);
  });
}

// Function to remove animate-wing class from elements
function removeAnimateWingClass() {
  const elements = document.querySelectorAll('#menu_wing, #about_wing, #other_wing');
  elements.forEach(element => {
    element.classList.remove('animate-wing');
  });
}