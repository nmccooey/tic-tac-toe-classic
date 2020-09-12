// Modal for the game menu.
function launchGameMenu() {
  let modalElement = document.querySelector("#game-menu-modal");
  let options = {
    inDuration: 200,
    outDuration: 200,
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
      inDuration: 200,
      outDuration: 200,
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
      startGame(gameMode, character);
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

// Starts a game with a specific mode and character.
function startGame(gameMode, character) {
  console.log("Game has started.");
  console.log(gameMode);
  console.log(character.getAttribute("data"));
}

// Once DOM loads, open game menu modal.
document.addEventListener('DOMContentLoaded', function() {
  launchGameMenu();
});