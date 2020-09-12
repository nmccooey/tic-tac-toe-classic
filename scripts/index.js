// Modal for the game menu.
function launchGameMenu() {
  let modalElement = document.querySelector("#game-menu-modal");
  let options = {
    inDuration: 0,
    outDuration: 0,
    opacity: 1.0,
    dismissible: false
  };

  let gameMenuinstance = M.Modal.init(modalElement, options);
  gameMenuinstance.open();
  let gameMode = "hvh";

  document.querySelector("#next-button").addEventListener("click", function() {
    // Check mode selection.
    if (document.querySelector("#human-v-computer").checked) {
      gameMode = "hvc";
    }

    // Launch choose character modal.
    launchChooseCharacterModal();
  });

  // Modal for player to choose character.
  function launchChooseCharacterModal() {
    gameMenuinstance.close();
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
    score: 0
  }
  // Computer
  let playerTwo = {
    name: "Goblin",
    score: 0
  }

  initEventListeners();

  // Initializes event listeners for each game spot.
  function initEventListeners() {
    document.querySelectorAll(".game-spot").forEach(gameSpot => {
      gameSpot.addEventListener("click", event => {
          if (gameSpot.innerHTML == "") {
            gameSpot.innerHTML = playerOne.name;
            // Check winner.
          }
      });
    });
  }
}