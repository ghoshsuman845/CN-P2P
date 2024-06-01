const dropArea = document.getElementById("drop-area");

const inputFile = document.getElementById("input-file");

const imgView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

const imageLinkList = [];

function uploadImage() {
  // 1. get the selected image by user
  const imageLink = URL.createObjectURL(inputFile.files[0]);
  imageLinkList.push(imageLink);
  localStorage.setItem("imageLinkList", JSON.stringify(imageLinkList));
  // 2. show the selected image on the screen

  // how to add styles to HTml element using JS
  // targettedElement.style.propertyName = value;
  imgView.style.backgroundImage = `url(${imageLink})`;
  imgView.textContent = "";
  imgView.style.border = "none";
}

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();

  inputFile.files = event.dataTransfer.files;
  uploadImage();
});
