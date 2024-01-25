const updateButton = document.getElementById("updateDetails");
const cancelButton = document.getElementById("cancel");
const levelButton = document.getElementById("level 3")
const dialog = document.getElementById("favDialog");
dialog.returnValue = "favAnimal";

function openCheck(dialog) {
  if (dialog.open) {
    console.log("Dialog open");
  } else {
    console.log("Dialog closed");
  }
}

// Update button opens a modal dialog
updateButton.addEventListener("click", () => {
  dialog.showModal();
  openCheck(dialog);
});

// Form cancel button closes the dialog box
cancelButton.addEventListener("click", () => {
  dialog.close("animalNotChosen");
  openCheck(dialog);
});

levelButton.addEventListener("click", () => {
    dialog.showModal();
    openCheck(dialog);
  });