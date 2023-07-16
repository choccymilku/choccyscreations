var imagePaths = [
  "images/image (62).png",
  "images/image (63).png"
];

var recentScroll = document.getElementById("recent_scroll");

// Loop through the array and create the image elements dynamically
imagePaths.forEach(function(path) {
  var img = document.createElement("img");
  img.src = path;
  recentScroll.appendChild(img);
});
