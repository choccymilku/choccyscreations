const menuwing = document.getElementById("menu_wing");
const aboutwing = document.getElementById("about_wing");
const otherwing = document.getElementById("other_wing");
const menuWingText = document.getElementById("menu_wing_text");
const aboutWingText = document.getElementById("about_wing_text");
const otherWingText = document.getElementById("other_wing_text");
const menuWingBack = document.getElementById("menu_wing_back");
const aboutWingBack = document.getElementById("about_wing_back");
const otherWingBack = document.getElementById("other_wing_back");
const menu = document.getElementById("menu");
const about = document.getElementById("about");
const other = document.getElementById("other");
const intro = document.getElementById("intro_full");
const intro_bg1 = document.getElementsByClassName("intro_bg")[0];
const topbarBack = document.getElementsByClassName("back_topbar")[0];
const body = document.getElementById("body");

menuWingText.addEventListener("click", () => {
  intro.style.opacity = "0";
  otherwing.style.opacity = "0";
  aboutwing.style.opacity = "0";
  menuwing.style.opacity = "0";
  body.style.backgroundColor = "var(--wing1)";
setTimeout(() => {
  menu.style.top = "50%"; 
}, 50);
setTimeout(() => {
  menuWingBack.style.animation = "animate-wing-button 0.65s forwards";
  menu.style.opacity = "1";
}, 300);
});

menuWingBack.addEventListener("click", () => {
setTimeout(() => {
  menu.style.opacity = "0";
  menuWingBack.style.animation = "animate-wing-button-back 0.65s forwards";
}, 50);
setTimeout(() => {
  otherwing.style.opacity = "1";
  aboutwing.style.opacity = "1";
  menuwing.style.opacity = "1";
  menu.style.top = "-50%";
}, 275);
setTimeout(() => {
  body.style.backgroundColor = "var(--background)";
}, 300);
setTimeout(() => {
  intro.style.opacity = "1";
}, 500);
});

aboutWingText.addEventListener("click", () => {
  intro.style.opacity = "0";
  otherwing.style.opacity = "0";
  aboutwing.style.opacity = "0";
  menuwing.style.opacity = "0";
  body.style.backgroundColor = "var(--wing2)";
setTimeout(() => {
  about.style.top = "50%"; 
}, 50);
setTimeout(() => {
  aboutWingBack.style.animation = "animate-wing-button 0.65s forwards";
  about.style.opacity = "1";
}, 300);
});

aboutWingBack.addEventListener("click", () => {
  setTimeout(() => {
    about.style.opacity = "0";
    aboutWingBack.style.animation = "animate-wing-button-back 0.65s forwards";
  }, 50);
  setTimeout(() => {
    otherwing.style.opacity = "1";
    aboutwing.style.opacity = "1";
    menuwing.style.opacity = "1";
    about.style.top = "-50%";
  }, 275);
  setTimeout(() => {
    body.style.backgroundColor = "var(--background)";
  }, 300);
  setTimeout(() => {
    intro.style.opacity = "1";
  }, 500);
});

otherWingText.addEventListener("click", () => {
  intro.style.opacity = "0";
  otherwing.style.opacity = "0";
  aboutwing.style.opacity = "0";
  menuwing.style.opacity = "0";
  body.style.backgroundColor = "var(--wing3)";
setTimeout(() => {
  other.style.top = "50%"; 
}, 50);
setTimeout(() => {
  otherWingBack.style.animation = "animate-wing-button 0.65s forwards";
  other.style.opacity = "1";
}, 300);
});

otherWingBack.addEventListener("click", () => {
  setTimeout(() => {
    other.style.opacity = "0";
    otherWingBack.style.animation = "animate-wing-button-back 0.65s forwards";
  }, 50);
  setTimeout(() => {
    otherwing.style.opacity = "1";
    aboutwing.style.opacity = "1";
    menuwing.style.opacity = "1";
    other.style.top = "-50%";
  }, 275);
  setTimeout(() => {
    body.style.backgroundColor = "var(--background)";
  }, 300);
  setTimeout(() => {
    intro.style.opacity = "1";
  }, 500);
});






