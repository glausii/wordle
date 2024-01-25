document.addEventListener("DOMContentLoaded", function () {
    const wordList = ["allee", "adler", "apfel", "birne", "blume", "feder", "fisch", "fluss", 
    "gabel", "glanz", "karte", "lampe", "leben", "liebe", "leber", "niger", "tasse", "tisch", 
    "vogel", "wiese", "wolke", "zwerg", "zebra"]; // Wortliste
    const wordLength = 5; // Nur 5-Buchstaben-Wörter
    const restrictWords = ["aaaaa", "aeiou", "eeeee", "iiiii", "ooooo", "uuuuu", "aieou", 
    "aioeu", "iouae", "aieou", "auioe", "uiaoe", "eoaui", "ioeau", "eaoiu", "euoia", "oieau", 
    "oeiau", "oiuea", "oiuae", "eouia", "aoieu", "uoiae", "uoiea"];
    
    const maxAttempts = 6; // Maximale Versuche
    let secretWord = chooseSecretWord(wordList);
    let attempts = 0;
  
    const wordDisplay = document.getElementById("word-display");
    const guessInput = document.getElementById("guess-input");
    const guessButton = document.getElementById("guess-button");
    const guessList = document.getElementById("guess-list");
    const attemptsDisplay = document.getElementById("attempts");
    const gameResult = document.getElementById("game-result");
    const restartButton = document.getElementById("restart-button");
    
  
    wordDisplay.innerHTML = `
      <span class="letter l0">_</span>
      <span class="letter l1">_</span>
      <span class="letter l2">_</span>
      <span class="letter l3">_</span>
      <span class="letter l4">_</span>
    `
  
    guessButton.addEventListener("click", makeGuess);
  
    guessInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        makeGuess();
      }
    });
  
    function chooseSecretWord(wordList) {
      const fiveLetterWords = wordList.filter(word => word.length === wordLength);
      return fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
    }
  
    function makeGuess() {
      const guess = guessInput.value.trim();
  
      if (guess.length !== wordLength) {
        alert("Ungültiger Versuch. Das Wort muss genau 5 Buchstaben haben.");
        return; 
      }
  
      const newWord = ["_", "_", "_", "_", "_"];
      let correct = 0;
      
      if (restrictWords.includes(guess)) {
        alert("Dieses Wort ist ungültig");
        return;
      }

      let counts = countLetters(secretWord, newWord)

      console.log(counts);
      //check correct
      for (let i = 0; i < wordLength; i++) {
        if (secretWord[i] === guess[i]) {
          const letter = wordDisplay.querySelector(`.letter.l${i}`)
          letter.textContent = guess[i]
          newWord[i] = `<span class="letter correct">${guess[i]}</span>`;
          counts[secretWord[i]] -= 1
          correct++;
        }
      }
      console.log(counts);

      //check wrongplace
      for (let i = 0; i < wordLength; i++) {
        if (secretWord[i] === guess[i]) {
          continue;
        }
        if (secretWord.includes(guess[i]) && counts[guess[i]] > 0) {
            newWord[i] = `<span class="letter wrongplace">${guess[i]}</span>`;
            counts[guess[i]] -= 1
        } 
        else if (!secretWord.includes(guess[i]) || counts[guess[i]] === 0) {
            newWord[i] = `<span class="letter incorrect">${guess[i]}</span>`;
        }
      }
  
      guessList.innerHTML += `<li>${guess} - ${newWord.join(" ")}</li>`;
  
      attempts++;
      attemptsDisplay.textContent = `Versuche: ${attempts}`;
  
      if (correct === wordLength) {
        endGame(true);
      } else if (attempts >= maxAttempts) {
        endGame(false);
      }

      guessInput.value = "";
      guessInput.focus();
    }
  
    function endGame(win) {
      guessInput.disabled = true;
      guessButton.disabled = true;
  
      if (win) {
        gameResult.textContent = "Gewonnen! Das geheime Wort war: " + secretWord;
      } else {
        gameResult.textContent = "Verloren! Das geheime Wort war: " + secretWord;
      }
    }
    
    restartButton.addEventListener("click", restartGame);

    function restartGame() {
      guessInput.disabled = false;
      guessButton.disabled = false;
      guessInput.value = "";
      guessInput.focus();
      guessList.innerHTML = "";
      gameResult.textContent = "";
      attempts = 0;
      attemptsDisplay.textContent = "Versuche: 0";
      secretWord = chooseSecretWord(wordList);
      wordDisplay.textContent = "_ ".repeat(wordLength);
      restartButton.style.display = "none";
      location.reload(true);
    }
  });
  
  function countLetters(word) {
    let counter = {}
    for (let i = 0; i < word.length; i++) {
      let letter = word[i]
      if(letter in counter) {
        counter[letter] += 1
      }
      else {
        counter[letter] = 1
      }
    }
    return counter
  }