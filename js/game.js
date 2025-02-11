class QuranTypingGame {
    constructor() {
        // Sample verses (replace with actual verses)
        this.verses = [
            "Bismillahirrahmanirrahim",
            "Elhamdulillahi rabbil alemin",
            "Errahmanirrahim"
        ];
        
        // Game state
        this.currentVerseIndex = 0;
        this.currentLetterIndex = 0;
        this.timer = 30;
        this.score = 0;
        this.isGameOver = false;
        this.timerInterval = null;

        // DOM elements
        this.verseContainer = document.getElementById('verse-container');
        this.typingInput = document.getElementById('typing-input');
        this.timerDisplay = document.getElementById('timer');
        this.scoreDisplay = document.getElementById('score');
        this.messageDisplay = document.getElementById('message');

        // Initialize game
        this.init();
    }

    init() {
        // Set up event listeners
        this.typingInput.addEventListener('input', this.handleInput.bind(this));
        
        // Start the game
        this.displayVerse();
        this.startTimer();
    }

    displayVerse() {
        // Clear previous verse
        this.verseContainer.innerHTML = '';
        
        // Get current verse and split into characters
        const verse = this.verses[this.currentVerseIndex];
        verse.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            this.verseContainer.appendChild(span);
        });

        // Reset input
        this.typingInput.value = '';
        this.currentLetterIndex = 0;
    }

    handleInput(event) {
        if (this.isGameOver) return;

        const inputChar = event.data;
        const currentVerse = this.verses[this.currentVerseIndex];
        const spans = this.verseContainer.children;

        // Handle backspace
        if (event.inputType === 'deleteContentBackward') {
            if (this.currentLetterIndex > 0) {
                this.currentLetterIndex--;
                spans[this.currentLetterIndex].className = '';
            }
            return;
        }

        // Check if the typed character matches the expected character
        if (inputChar === currentVerse[this.currentLetterIndex]) {
            // Correct input
            spans[this.currentLetterIndex].className = 'correct';
            this.currentLetterIndex++;

            // Check if verse is completed
            if (this.currentLetterIndex === currentVerse.length) {
                this.completeVerse();
            }
        } else {
            // Incorrect input
            spans[this.currentLetterIndex].className = 'incorrect';
            this.typingInput.value = this.typingInput.value.slice(0, -1);
        }
    }

    completeVerse() {
        // Add time bonus
        this.timer += 20;
        this.updateTimer();

        // Update score
        this.score += 100;
        this.updateScore();

        // Move to next verse
        this.currentVerseIndex++;
        if (this.currentVerseIndex < this.verses.length) {
            this.messageDisplay.textContent = 'Great job! Next verse...';
            setTimeout(() => {
                this.messageDisplay.textContent = '';
                this.displayVerse();
            }, 1500);
        } else {
            this.gameWin();
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer--;
            this.updateTimer();

            if (this.timer <= 0) {
                this.gameOver();
            }
        }, 1000);
    }

    updateTimer() {
        this.timerDisplay.textContent = `Time: ${this.timer}`;
    }

    updateScore() {
        this.scoreDisplay.textContent = `Score: ${this.score}`;
    }

    gameOver() {
        this.isGameOver = true;
        clearInterval(this.timerInterval);
        this.messageDisplay.textContent = 'Game Over! Refresh to try again.';
        this.typingInput.disabled = true;
    }

    gameWin() {
        this.isGameOver = true;
        clearInterval(this.timerInterval);
        this.messageDisplay.textContent = `Congratulations! You've completed all verses! Final score: ${this.score}`;
        this.typingInput.disabled = true;
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuranTypingGame();
});