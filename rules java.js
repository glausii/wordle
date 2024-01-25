function showContent() {
    document.getElementById("contentOption1").classList.add("hidden");
    document.getElementById("contentOption2").classList.add("hidden");
    document.getElementById("contentOption3").classList.add("hidden");

    var selectedOption = document.getElementById("options").value;
    document.getElementById("content" + selectedOption).classList.remove("hidden");
}