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

  document.querySelector("#next-button").addEventListener("click", function(){
    // Test to make sure one radio button is selected.
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
    let selectedCharacter = "";
    let characters = document.querySelectorAll(".box");
    for (let i = 0; i < characters.length; i++) {
      characters[i].addEventListener("click", function(){
        let selectedEl = document.querySelector(".selected");
        if(selectedEl){
          selectedEl.classList.remove("selected");
        }
        this.classList.add("selected");
        }, false);
    }

    // Listener for game button.
    document.querySelector("#start-game-button").addEventListener("click", function(){
      // Test to make sure a character radio button is selected.

      let selectedEl = document.querySelector(".selected");
      if (selectedEl) {
        alert(selectedEl.getAttribute("data"));
        closeCharacterModal();
      } else {
        alert('please choose an option');
      }
    });

    function closeCharacterModal() {
      characterInstance.close();

      // LAUNCHES GAME
      startGame();
    }
  }

}

function startGame() {
  console.log("Game has started.");
}

document.addEventListener('DOMContentLoaded', function() {
  launchGameMenu();
});