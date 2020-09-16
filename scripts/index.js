// Modal for the game menu.
function launchGameMenu() {
  let modalElement = document.querySelector("#game-menu-modal");
  let options = {
    inDuration: 0,
    outDuration: 0,
    opacity: 1.0,
    dismissible: false
  };

  let gameMenuInstance = M.Modal.init(modalElement, options);
  gameMenuInstance.open();
  let gameMode = "hvh";

  document.querySelector("#next-button").addEventListener("click", function() {
    // Check mode selection.
    if (document.querySelector("#human-v-computer").checked) {
      gameMode = "hvc";
    } else {
      gameMode = "hvh";
    }

    // Launch choose character modal.
    launchChooseCharacterModal();
  });

  // Modal for player to choose character.
  function launchChooseCharacterModal() {
    gameMenuInstance.close();
    let modalElement = document.querySelector("#choose-character-modal");
    let options = {
      inDuration: 0,
      outDuration: 500,
      opacity: 1.0,
      dismissible: false
    };
  
    let characterInstance = M.Modal.init(modalElement, options);
    characterInstance.open();

    // Listener for character select divs.
    let characters = document.querySelectorAll(".character");
    for (let i = 0; i < characters.length; i++) {
      characters[i].addEventListener("click", function() {
        let selectedCharacter = document.querySelector(".selected");
        if (selectedCharacter) {
          selectedCharacter.classList.remove("selected");
        }
        this.classList.add("selected");
        }, false);
    }

    // Listener for game button.
    document.querySelector("#start-game-button").addEventListener("click", function() {
      // Test to make sure a character is selected.
      let selectedCharacter = document.querySelector(".selected");
      if (selectedCharacter) {
        closeCharacterModal(selectedCharacter);
      } else {
        // Show warning toast to user for 1.5 seconds.
        makeToast("Must choose a character", 1500);
      }
    });

    // Closes modal and calls a function to start game.
    function closeCharacterModal(character) {
      characterInstance.close();
      startGame(gameMode, character.getAttribute("data"));
    }
  }
}

// Makes a toast.
function makeToast(string, displayLength) {
  M.toast({
    html: string,
    classes: 'rounded red',
    displayLength: displayLength
  });
}

// Once DOM loads, open game menu modal.
document.addEventListener('DOMContentLoaded', function() {
  launchGameMenu();
});

// ALL GAME LOGIC:
// ------------------------------------------------------

// Starts a game with a specific mode and character.
function startGame(gameMode, characterName) {
  // Human
  let playerOne = {
    name: `<i class="fas fa-${characterName}"></i>`,
    characterName: characterName,
    score: 0
  }
  // Computer
  let playerTwo = {
    name: `<i class="fab fa-optin-monster"></i>`,
    characterName: "Monster",
    score: 0
  }
  let board = ["","","","","","","","",""];
  let currentPlay = playerOne;

  startBackgroundMusic();
  initEventListeners();

  // Starts the background music on a loop.
  function startBackgroundMusic() {
    let backgroundMusic = new Audio("./sounds/scary-background.mp3");
    backgroundMusic.play();
    backgroundMusic.volume = 0.3;
    backgroundMusic.loop = true;
  }

  // Initializes event listeners for each game spot.
  function initEventListeners() {
    document.querySelectorAll(".game-spot").forEach(gameSpot => {
      gameSpot.addEventListener("click", event => {
        if (gameSpot.innerHTML == "") {
          gameSpot.innerHTML = currentPlay.name;
          board[gameSpot.getAttribute("data-index")] = currentPlay;
          checkWinner(board, currentPlay);
          changePlayer();
          if (gameMode == "hvc") {
            computerMove();
            checkWinner(board, currentPlay);
            changePlayer();
          }
        }
      });
    });
  }

  // Computers move.
  function computerMove() {
    let gameSpots = document.querySelectorAll(".game-spot");
    for (let i = 0; i < gameSpots.length; i++) {
      if(gameSpots[i].innerHTML == "") {
        console.log("looping");
        gameSpots[i].innerHTML = currentPlay.name;
        board[gameSpots[i].getAttribute("data-index")] = currentPlay;
        break;
      }
    }
  }

  // Changes player.
  function changePlayer() {
    if (currentPlay == playerOne) {
      currentPlay = playerTwo;
    } else {
      currentPlay = playerOne;
    }
  }

  // Checks to see if there is a winner based on the current board.
  function checkWinner(board, currentPlay) {
    let winner = winTest(board, currentPlay);
    if (winner == playerOne || winner == playerTwo) {
      // Make Modal and announce winner.
      makeResultsModal(winner);
    } else if (winner == "tie") {
      // Make Modal and announce tie.
      makeResultsModal("tie");
    }
  }

  function makeResultsModal(winner) {
    let modalElement = document.querySelector("#results-modal");
    let options = {
      inDuration: 500,
      outDuration: 0,
      opacity: 1.0,
      dismissible: false
    };
  
    let resultsModal = M.Modal.init(modalElement, options);
    resultsModal.open();

    if (winner == "tie") {
      document.querySelector("#winner-display").innerText = "IT'S A TIE!";
    } else {
      document.querySelector("#winner-icon").innerHTML = winner.name;
      document.querySelector("#winner-display").innerText = winner.characterName.toUpperCase();
    }

    document.querySelector("#play-again-button").addEventListener("click", function(){
      location.reload();
    });
  }

  // Contains and checks all win cases.
  function winTest(board, side) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];

    for (let i = 0; i < winConditions.length; i++) { 
      let sum = 0;
      let w = winConditions[i];
      
      for (let b = 0; b < w.length; b++) {
        if(board[w[b]] === side) {
            sum++
        }
      }
      
      if (sum === 3) {
        return side;
      }

      // check tie:
      let spotsTaken = 0;
      for (let i = 0; i < board.length; i++) {
        if(board[i] !== "") {
            spotsTaken++;
        }
      }

      if (spotsTaken == 9) {
        return "tie";
      } 
    }

    return false;
  }
}