const menuWing = document.getElementById("menu_wing");
const menuWingText = document.getElementById("menu_wing_text");
const aboutWingText = document.getElementById("about_wing_text");
const menuwinganim = document.getElementById("menu_wing_anim");
const aboutwinganim = document.getElementById("about_wing_anim");
const aboutwing = document.getElementById("about_wing");
const otherwing = document.getElementById("other_wing");
const menu = document.getElementById("menu");
const about = document.getElementById("about");
const intro = document.getElementById("intro_full");
const intro_bg1 = document.getElementsByClassName("intro_bg")[0];
const menuWingBack = document.getElementById("menu_wing_back");
const aboutWingBack = document.getElementById("about_wing_back");
const topbarBack = document.getElementsByClassName("back_topbar")[0];


aboutWingText.addEventListener("click", () => {
  aboutwinganim.style.animation = "menu_anim_height 0.5s forwards";
  intro.style.opacity = "0";

  setTimeout(() => {
    aboutwinganim.style.animation = "menu_anim_width 1s forwards";
    menuWing.style.opacity = "0";
    otherwing.style.opacity = "0";
  }, 275);

  setTimeout(() => {
    aboutwinganim.style.transform = "rotate(0deg)";
    aboutWingBack.style.display = "block";
    about.style.opacity = "1";
  }, 500);

  setTimeout(() => {
    aboutWingBack.style.animation = "animate-wing-button 0.65s forwards";
    about.style.top = "50%";
  }, 600);
});

aboutWingBack.addEventListener("click", () => {
  aboutwinganim.style.animation = "menu_anim_width_back 0.5s forwards";

  setTimeout(() => {
    menuWing.style.opacity = "1";
    otherwing.style.opacity = "1";
    about.style.opacity = "0";
    about.style.top = "-50%";
  }, 275);

  setTimeout(() => {
    aboutwinganim.style.animation = "menu_anim_height_back 0.5s forwards";
    aboutWingBack.style.animation = "animate-wing-button-back 0.65s forwards";
  }, 500);

  setTimeout(() => {
    intro.style.opacity = "1";
  }, 800);
});




menuWingText.addEventListener("click", () => {
    menuwinganim.style.animation = "menu_anim_height 0.5s forwards";
    intro.style.opacity = "0";

    setTimeout(() => {
      menuwinganim.style.animation = "menu_anim_width 1s forwards";
      otherwing.style.opacity = "0";
      aboutwing.style.opacity = "0";
    }, 275);

    setTimeout(() => {
      menuwinganim.style.transform = "rotate(0deg)";
      menu.style.opacity = "1";
    }, 500);

    setTimeout(() => {
      menuWingBack.style.animation = "animate-wing-button 0.65s forwards";
      menu.style.top = "50%"; 
    }, 600);
});

menuWingBack.addEventListener("click", () => {
    menuwinganim.style.animation = "menu_anim_width_back 0.5s forwards";

    setTimeout(() => {
      otherwing.style.opacity = "1";
      aboutwing.style.opacity = "1";
      menu.style.opacity = "0";
      menu.style.top = "-50%";
    }, 275);

    setTimeout(() => {
      menuwinganim.style.animation = "menu_anim_height_back 0.5s forwards";
      menuWingBack.style.animation = "animate-wing-button-back 0.65s forwards";
    }, 500);

    setTimeout(() => {
      intro.style.opacity = "1";
    }, 800);
});






