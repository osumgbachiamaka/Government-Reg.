
window.onscroll = function() {fixHeader()};

// Get the header
let header = document.querySelector(".header-position");

// Get the offset position of the navbar
let sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function fixHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


let createPost = document.querySelector("#create-post");
let modalDisplay = document.querySelector(".modal");
let modalClose = document.querySelector(".modal-close");

createPost.addEventListener('focus', function(){
  modalDisplay.style.display = "block";
});

modalClose.addEventListener('click', function(){
  modalDisplay.style.display = "none";
})