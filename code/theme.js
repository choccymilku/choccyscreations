function getUserPreference() {
  return localStorage.getItem("theme") || "system";
}

function saveUserPreference(userPreference) {
  localStorage.setItem("theme", userPreference);
}

function getAppliedMode(userPreference) {
  if (userPreference === "light") {
    return "light";
  }
  if (userPreference === "dark") {
    return "dark";
  }
  // Add new themes here
  if (userPreference === "spotify") {
    return "spotify";
  }
  if (userPreference === "twitch") {
    return "twitch";
  }
  // system
  if (matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }
  return "dark";
}

function setAppliedMode(mode) {
  document.documentElement.dataset.appliedMode = mode;
}

function rotatePreferences(userPreference) {
  if (userPreference === "system") {
    return "light";
  }
  if (userPreference === "light") {
    return "dark";
  }
  if (userPreference === "dark") {
    return "spotify";
  }
  // Add new themes here
  if (userPreference === "spotify") {
    return "twitch";
  }
  if (userPreference === "twitch") {
    return "system";
  }
  // for invalid values, just in case
  return "system";
}

const themeToggler = document.getElementById("theme-toggle");

// Mimic heavy load done by other JS scripts
setTimeout(() => {
  let userPreference = getUserPreference();
  setAppliedMode(getAppliedMode(userPreference));
  themeToggler.innerText = userPreference;

  themeToggler.onclick = () => {
    const newUserPref = rotatePreferences(userPreference);
    userPreference = newUserPref;
    saveUserPreference(newUserPref);
    themeToggler.innerText = newUserPref;
    setAppliedMode(getAppliedMode(newUserPref));
  };
}, 0);