const words = ["javascript", "hangman", "coding", "computer", "programming", "accordion", "astronaut", "broccoli", "butterfly", "caterpillar", 
"cucumber", "detective", "elephant", "firetruck", "galaxy", 
"helicopter", "ice cream", "jellyfish", "kangaroo", "library", 
"microphone", "notebook", "octopus", "pineapple", "quarantine", 
"rainbow", "saxophone", "telescope", "unicorn", "volleyball", 
"watermelon", "xylophone", "yogurt", "zucchini", "aeroplane", 
"basketball", "computer", "dinosaur", "earthquake", "firework", 
"guitar", "hotdog", "island", "jaguar", "kangaroo", 
"lighthouse", "microscope", "necklace", "orange", "pineapple", 
"popcorn", "question", "robot", "strawberry", "telescope", 
"umbrella", "volcano", "waterfall", "xylophone", "yacht", 
"zebra", "avocado", "basketball", "calculator", "doughnut", 
"elephant", "flashlight", "guitar", "hammock", "igloo", 
"jellybean", "kangaroo", "lemonade", "mountain", "necklace", 
"octopus", "parrot", "quokka", "rainbow", "snorkel", 
"telescope", "umbrella", "volleyball", "watermelon", "xylophone", 
"yacht", "zucchini", "acorn", "butterfly", "carousel", 
"daffodil", "elephant", "flamingo", "goldfish", "hammock", 
"ice cream", "jellyfish", "kite", "ladybug", "mermaid", 
"narwhal", "ostrich", "palm tree", "quokka", "rainbow"];
let round = 1;
let totalScore = 0;
let selectedWord, guessedWord, attempts;

// Define strike and game over audio
const strikeAudio = new Audio("http://bit.ly/so-ball-hit"); // Replace "strike_audio.mp3" with the actual path to your strike sound effect
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer"); // Replace "game_over_audio.mp3" with the actual path to your game over sound effect


// Function to start the timer
let timeLeft = 60; // Initial time in seconds
let timerInterval; // Variable to store interval reference

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp() {
    alert("Time's up!");
    document.getElementById("playAgain").style.display = "block";
}

function restartTimer() {
    timeLeft = 60; // Reset the timer to the initial time
    document.getElementById("time").innerText = timeLeft; // Update the timer display
    startTimer(); // Start the timer again
}

function restartGame() {
    document.getElementById("playAgain").style.display = "none"; // Hide the "Play Again" button
    restartTimer(); // Restart the timer
    // Add any other game initialization logic here
}

window.onload = function() {
    startTimer(); // Start the timer when the page loads
};

// Call startTimer function to start the timer
startTimer();


function toggleInstructions() {
    var instructionsDiv = document.getElementById("instructions");
    if (instructionsDiv.style.display === "none" || instructionsDiv.style.display === "") {
        instructionsDiv.style.display = "block";
    } else {
        instructionsDiv.style.display = "none";
    }
}

function startRound() {
    if (round <= 3) {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedWord = Array(selectedWord.length).fill("_");
        attempts = 6;
        displayWord();
        round++;
    } else {
        // End of game
        alert("Congratulations! You completed all rounds!");
        // Optionally, you can reset the game here if needed
    }
}


function displayWord() {
    document.getElementById("wordDisplay").innerText = guessedWord.join(" ");
}
let hangmanStage = 0; // Tracks the current hangman stage

// Function to update the hangman image
function updateHangmanImage() {
    const hangmanImage = document.getElementById('hangman-image');
    hangmanImage.src = `assets/hangman_${hangmanStage}.png`;
}
function guessLetter(letter) {
    let guess = letter.toLowerCase();
    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert("Please enter a valid single letter.");
        return;
    }

    // Check if the guessed letter is in the selected word
    if (selectedWord.includes(guess)) {
        // Update guessedWord with the correctly guessed letters
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess) {
                guessedWord[i] = guess;
            }
        }
        displayWord(); // Update displayed word
        // Check if all letters are guessed correctly
        if (!guessedWord.includes("_")) {
            alert("Congratulations! You won this round!");
            totalScore += attempts; // Add attempts to total score
            alert("Your total score is: " + totalScore);
            // Provide option to play again
            startRound();
        }
    } else {
        // Incorrect guess logic
        attempts--;
        alert("Incorrect guess. You have " + attempts + " attempts left.");
        strikeAudio.play(); // Play strike sound
        if (attempts === 0) {
            alert("Game over! The word was: " + selectedWord);
            gameOverAudio.play(); // Play game over sound
            // Provide option to play again
            playAgain();
        }
        // Increment hangman stage and update image
        hangmanStage++;
        updateHangmanImage();
    }
    document.getElementById("guess").value = "";
}

function playAgain() {
    // Display play again button
    document.getElementById("playAgain").style.display = "block";
}
function showHint() {
    // Define an array of hints corresponding to the words
    const hints = {
        "javascript": "A popular programming language for web development.",
        "hangman": "A word guessing game where players try to guess a word letter by letter.",
        "coding": "The process of writing instructions for a computer to execute.",
        "computer": "An electronic device that processes data and performs tasks according to instructions.",
        "programming": "The act of writing code to create software or applications." ,
        "accordion": "A musical instrument with keys, buttons, or a combination of both, that produces sound by air from bellows.",
        "astronaut": "A person trained to travel in a spacecraft." ,
        "broccoli": "A green vegetable that is closely related to cauliflower." ,
        "butterfly": "An insect with colorful wings that undergoes metamorphosis." ,
        "caterpillar": "The larval stage of a butterfly or moth." ,
        "cucumber": "A long, green-skinned fruit with watery flesh." ,
        "detective": "A person who investigates crimes and gathers evidence." ,
        "elephant": "A large mammal with a long trunk and tusks." ,
        "firetruck": "A vehicle equipped for firefighting, typically carrying firefighters and their equipment." ,
        "galaxy": "A system of millions or billions of stars, together with gas and dust, held together by gravitational attraction." ,
        "helicopter": "A type of aircraft that is lifted and propelled by one or more horizontal rotors." ,
        "ice cream": "A frozen dessert made from cream, milk, sugar, and flavorings." ,
        "jellyfish": "A marine animal with a soft, jelly-like body and tentacles." ,
        "kangaroo": "A marsupial native to Australia known for its powerful hind legs and tail." ,
        "library": "A building or room containing collections of books, periodicals, and sometimes films and recorded music for people to read, borrow, or refer to." ,
        "microphone": "A device used to convert sound waves into electrical signals for amplification or recording." ,
        "notebook": "A book with blank pages for writing notes." ,
        "octopus": "A marine mollusk with eight sucker-bearing arms, a soft body, and usually a small internal shell." ,
        "pineapple": "A tropical fruit with a tough, spiky rind and sweet, juicy flesh." ,
        "quarantine": "A state of isolation or restricted movement imposed to prevent the spread of contagious diseases." ,
        "rainbow": "A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light in water droplets, resulting in a spectrum of light appearing in the sky.",
        "saxophone": "A musical instrument of the woodwind family with a conical metal tube and a single reed mouthpiece." ,
        "telescope": "An optical instrument used to observe distant objects by collecting electromagnetic radiation." ,
        "unicorn": "A mythical creature resembling a horse with a single, spiraled horn projecting from its forehead." ,
        "volleyball": "A team sport played with a ball over a net, usually by two teams of six players." ,
        "watermelon": "A large, round fruit with green skin, pink flesh, and black seeds." ,
        "xylophone": "A musical instrument consisting of a series of wooden bars of different lengths that are struck with mallets to produce musical notes." ,
        "yogurt": "A dairy product made by fermenting milk with bacterial cultures." ,
        "zucchini": "A variety of summer squash that is usually green and elongated." };
            // Add more words and hints here
        
        // Add hints for other words as needed


    // Display the hint for the current word
    const hint = hints[selectedWord.toLowerCase()];
    if (hint) {
        alert("Hint: " + hint);
    } else {
        alert("Sorry, no hint available for this word.");
    }
}


// Function to restart the game
function restartGame() {
    // Reset hangman stage
    hangmanStage = 0;
    // Reset hangman image
    updateHangmanImage();
    // Reset other variables, hide play again button, and start new game
    totalScore = 0;
    round = 1;
    document.getElementById("playAgain").style.display = "none";
    startRound();
}

window.onload = function () {
    // Retrieve player object from local storage
    const storedPlayer = localStorage.getItem('player');

    // Parse the JSON string to a JavaScript object
    const player = JSON.parse(storedPlayer);

    // Display player's name and nickname on the game page
    if (player) {
        alert("Welcome, " + player.name + "!");
        // You can further customize the display of player's name and nickname as needed
    }

    // Start the game
    alert("Starting round 1");
    startRound();
};
function setTheme(theme) {
    document.body.className = 'theme-' + theme;
}