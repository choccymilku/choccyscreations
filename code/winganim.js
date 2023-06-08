const menuwing = document.getElementById("menu_wing");
const aboutwing = document.getElementById("about_wing");
const otherwing = document.getElementById("other_wing");
const menuWingText = document.getElementById("menu_wing_text");
const aboutWingText = document.getElementById("about_wing_text");
const menu = document.getElementById("menu");
const about = document.getElementById("about");
const intro = document.getElementById("intro_full");
const intro_bg1 = document.getElementsByClassName("intro_bg")[0];
const menuWingBack = document.getElementById("menu_wing_back");
const aboutWingBack = document.getElementById("about_wing_back");
const topbarBack = document.getElementsByClassName("back_topbar")[0];
const body = document.getElementById("body");

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






