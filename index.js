function startGame(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get player's name and nickname from the form
    const playerName = document.getElementById("playerName").value.trim();
    const playerNickname = document.getElementById("playerNickname").value.trim();

    // Create a player object to store name and nickname
    const player = {
        name: playerName,
        nickname: playerNickname
    };

    // Store player object in local storage
    localStorage.setItem('player', JSON.stringify(player));

    // Redirect to the game page
    window.location.href = "game.html";
}


