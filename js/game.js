class QuranTypingGame {
    constructor() {
        // Get verses
        this.verses = getRandomVerses(5);
        
        // Game state
        this.currentVerseIndex = 0;
        this.currentLetterIndex = 0;
        this.timer = 30;
        this.score = 0;
        this.wpm = 0;
        this.totalKeystrokes = 0;
        this.correctKeystrokes = 0;
        this.startTime = null;
        this.isGameOver = false;
        this.timerInterval = null;

        // DOM elements
        this.verseContainer = document.getElementById('verse-container');
        this.hiddenInput = document.getElementById('hidden-input');
        this.timerDisplay = document.getElementById('timer');
        this.scoreDisplay = document.getElementById('score');
        this.wpmDisplay = document.getElementById('wpm');
        this.messageDisplay = document.getElementById('message');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.errorsDisplay = document.getElementById('errors');
        this.bonusNotification = document.getElementById('bonus-notification');
        this.cursor = document.getElementById('cursor');

        // Sound elements
        this.correctSound = document.getElementById('correctSound');
        this.incorrectSound = document.getElementById('incorrectSound');
        this.bonusSound = document.getElementById('bonusSound');

        // Initialize game
        this.init();
    }

    init() {
        // Focus hidden input and maintain focus
        this.hiddenInput.focus();
        document.addEventListener('click', () => this.hiddenInput.focus());
        
        // Set up event listeners
        this.hiddenInput.addEventListener('input', this.handleInput.bind(this));
        this.hiddenInput.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        // Start the game
        this.displayVerse();
        this.startTimer();
        this.startTime = Date.now();

        // Set initial cursor position
        this.updateCursorPosition();
    }

    displayVerse() {
        // Clear previous verse
        this.verseContainer.innerHTML = '';
        
        // Get current verse and split into characters
        const verse = this.verses[this.currentVerseIndex].text;
        verse.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            this.verseContainer.appendChild(span);
        });

        // Reset input and cursor position
        this.hiddenInput.value = '';
        this.currentLetterIndex = 0;
        this.updateCursorPosition();
    }

    updateCursorPosition() {
        const spans = this.verseContainer.children;
        if (this.currentLetterIndex < spans.length) {
            const currentSpan = spans[this.currentLetterIndex];
            const rect = currentSpan.getBoundingClientRect();
            const containerRect = this.verseContainer.getBoundingClientRect();
            
            this.cursor.style.left = `${rect.left - containerRect.left}px`;
            this.cursor.style.top = `${rect.top - containerRect.top}px`;
        }
    }

    handleKeyDown(event) {
        // Prevent backspace from navigating back
        if (event.key === 'Backspace') {
            event.preventDefault();
            
            // Only allow backspace on incorrect letters
            const spans = this.verseContainer.children;
            if (this.currentLetterIndex > 0 && 
                spans[this.currentLetterIndex - 1].classList.contains('incorrect')) {
                this.currentLetterIndex--;
                spans[this.currentLetterIndex].className = '';
                this.updateCursorPosition();
            }
        }
    }

    handleInput(event) {
        if (this.isGameOver) return;

        const inputChar = event.data;
        if (!inputChar) return; // Handle backspace or other special keys

        const currentVerse = this.verses[this.currentVerseIndex].text;
        const spans = this.verseContainer.children;

        this.totalKeystrokes++;

        // Check if the typed character matches the expected character
        if (inputChar === currentVerse[this.currentLetterIndex]) {
            // Correct input
            spans[this.currentLetterIndex].className = 'correct';
            this.correctKeystrokes++;
            this.playSound(this.correctSound);
            this.currentLetterIndex++;
            this.updateCursorPosition();

            // Update WPM
            this.updateWPM();

            // Check if verse is completed
            if (this.currentLetterIndex === currentVerse.length) {
                this.completeVerse();
            }
        } else {
            // Incorrect input
            spans[this.currentLetterIndex].className = 'incorrect';
            this.playSound(this.incorrectSound);
            this.updateErrors();
        }

        // Update accuracy
        this.updateAccuracy();
    }

    updateWPM() {
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60; // in minutes
        const wordsTyped = this.correctKeystrokes / 5; // Assuming average word length of 5 characters
        this.wpm = Math.round(wordsTyped / timeElapsed);
        this.wpmDisplay.textContent = `WPM: ${this.wpm}`;
    }

    updateAccuracy() {
        const accuracy = Math.round((this.correctKeystrokes / this.totalKeystrokes) * 100);
        this.accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
    }

    updateErrors() {
        const errors = this.totalKeystrokes - this.correctKeystrokes;
        this.errorsDisplay.textContent = `Errors: ${errors}`;
    }

    playSound(soundElement) {
        soundElement.currentTime = 0;
        soundElement.play().catch(error => console.log('Audio playback error:', error));
    }

    showBonusNotification() {
        this.bonusNotification.classList.add('show');
        this.playSound(this.bonusSound);
        setTimeout(() => {
            this.bonusNotification.classList.remove('show');
        }, 1000);
    }

    completeVerse() {
        // Calculate bonus based on accuracy and speed
        const accuracy = (this.correctKeystrokes / this.totalKeystrokes) * 100;
        const speedBonus = Math.floor(this.wpm / 10);
        const accuracyBonus = Math.floor(accuracy / 10);
        const timeBonus = 20 + speedBonus + accuracyBonus;

        // Add time bonus
        this.timer += timeBonus;
        this.updateTimer();
        this.showBonusNotification();

        // Update score
        const verseScore = 100 + (speedBonus * 10) + (accuracyBonus * 10);
        this.score += verseScore;
        this.updateScore();

        // Move to next verse
        this.currentVerseIndex++;
        if (this.currentVerseIndex < this.verses.length) {
            this.messageDisplay.textContent = `Great job! Next verse... (+${verseScore} points)`;
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
        this.hiddenInput.disabled = true;

        // Save high score
        this.saveHighScore();
    }

    gameWin() {
        this.isGameOver = true;
        clearInterval(this.timerInterval);
        this.messageDisplay.textContent = `Congratulations! You've completed all verses!
            Final score: ${this.score}
            WPM: ${this.wpm}
            Accuracy: ${Math.round((this.correctKeystrokes / this.totalKeystrokes) * 100)}%`;
        this.hiddenInput.disabled = true;

        // Save high score
        this.saveHighScore();
    }

    saveHighScore() {
        const highScores = JSON.parse(localStorage.getItem('quranTypingHighScores') || '[]');
        highScores.push({
            score: this.score,
            wpm: this.wpm,
            accuracy: Math.round((this.correctKeystrokes / this.totalKeystrokes) * 100),
            date: new Date().toISOString()
        });
        
        // Sort and keep only top 5 scores
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem('quranTypingHighScores', JSON.stringify(highScores.slice(0, 5)));
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuranTypingGame();
});