const menuWing = document.getElementById("menu_wing");
const menuwinganim = document.getElementById("menu_wing_anim");
const aboutwing = document.getElementById("about_wing");
const otherwing = document.getElementById("other_wing");
const menu = document.getElementById("menu");
const intro = document.getElementById("intro_full");
const intro_bg1 = document.getElementsByClassName("intro_bg")[0];
const intro_bg2 = document.getElementsByClassName("intro_bg")[1];

let isAnimated = false; // Flag to track if animation has already been applied

menuWing.addEventListener("click", () => {
  if (!isAnimated) { // Check if animation has not been applied yet
    menuwinganim.style.animation = "menu_anim_height 0.5s forwards";
    intro.style.opacity = "0";
    intro_bg1.style.opacity = "0";
    intro_bg2.style.opacity = "0";

    setTimeout(() => {
      menuwinganim.style.animation = "menu_anim_width 1s forwards";
      aboutwing.style.opacity = "0";
      otherwing.style.opacity = "0";
      menu.style.top = "50%";
    }, 275);

    setTimeout(() => {
      menuwinganim.style.transform = "rotate(0deg)";
      menu.style.opacity = "1";
    }, 500);

    isAnimated = true; // Set flag to indicate animation has been applied
  }
});
