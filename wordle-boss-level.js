document.addEventListener("DOMContentLoaded", function () {
    const wordList = ["geschwindigkeitsüberschreitung", "bundesverteidigungsministerium", "feuerversicherungsgesellschaft", "wohnungseigentümergemeinschaft", "wahrscheinlichkeitstheoretisch", "feuchtigkeitsunempfindlichkeit"]; // Wortliste
    const wordLength = 30; // Nur 5-Buchstaben-Wörter
    const restrictWords = ["aaaaa", "aeiou", "eeeee", "iiiii", "ooooo", "uuuuu", "aieou", 
    "aioeu", "iouae", "aieou", "auioe", "uiaoe", "eoaui", "ioeau", "eaoiu", "euoia", "oieau", 
    "oeiau", "oiuea", "oiuae", "eouia", "aoieu", "uoiae", "uoiea"];
    
    const maxAttempts = 15; // Maximale Versuche
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
      <span class="letter l5">_</span>
      <span class="letter l6">_</span>
      <span class="letter l7">_</span>
      <span class="letter l8">_</span>
      <span class="letter l9">_</span>
      <span class="letter l10">_</span>
      <span class="letter l11">_</span>
      <span class="letter l12">_</span>
      <span class="letter l13">_</span>
      <span class="letter l14">_</span>
      <span class="letter l15">_</span>
      <span class="letter l16">_</span>
      <span class="letter l17">_</span>
      <span class="letter l18">_</span>
      <span class="letter l19">_</span>
      <span class="letter l20">_</span>
      <span class="letter l21">_</span>
      <span class="letter l22">_</span>
      <span class="letter l23">_</span>
      <span class="letter l24">_</span>
      <span class="letter l25">_</span>
      <span class="letter l26">_</span>
      <span class="letter l27">_</span>
      <span class="letter l28">_</span>
      <span class="letter l29">_</span>
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
        alert("Ungültiger Versuch. Das Wort muss genau 30 Buchstaben haben.");
        return; 
      }
  
      const newWord = ["_", "_", "_", "_", "_", "_", "_", "_","_", "_", "_", "_", "_", "_", "_", "_","_", "_", "_", "_", "_", "_", "_", "_","_", "_", "_", "_", "_", "_"];
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