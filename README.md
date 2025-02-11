# Quran Typing Game

A browser-based typing game where users improve their typing skills while practicing Turkish Quran verses letter by letter. The game features real-time feedback, scoring system, and performance tracking.

## Features

### Core Gameplay
- Real-time letter-by-letter typing validation
- Visual feedback for correct and incorrect typing
- Cursor tracking and positioning
- Word spacing and formatting for better readability

### Game Mechanics
- Timer system with time bonuses for verse completion
- Dynamic scoring based on speed and accuracy
- Words per minute (WPM) calculation
- Accuracy tracking and error counting
- High score system using localStorage

### User Interface
- Clean, responsive design
- Game controls (Start, Pause, Resume, Restart)
- Performance statistics display
- Visual notifications for bonuses
- Support for mobile devices

### Audio Feedback
- Sound effects for correct typing
- Sound effects for incorrect typing
- Sound effects for verse completion bonuses

## Project Structure

```
quran-typing-game/
├── index.html           # Main HTML file
├── css/
│   └── styles.css      # Styling and animations
├── js/
│   ├── game.js         # Main game logic
│   └── verses.js       # Verse management
└── sounds/             # Audio files
    ├── correct.mp3
    ├── incorrect.mp3
    └── bonus.mp3
```

### Component Overview

#### HTML Structure (index.html)
- Game container with statistics display
- Verse display area
- Hidden input for keystroke capture
- Game controls and overlays
- Sound elements

#### Styling (styles.css)
- Responsive layout design
- Game element styling
- Animations for feedback
- Pause overlay styling
- Mobile-friendly adjustments

#### Game Logic (game.js)
- QuranTypingGame class managing game state
- Input handling and validation
- Performance calculation (WPM, accuracy)
- Timer and bonus management
- High score system

#### Verse Management (verses.js)
- Verse collection with translations
- Random verse selection
- Sequential verse access

## Game Mechanics Details

### Scoring System
- Base score: 100 points per verse
- Speed bonus: Based on WPM (Words Per Minute)
- Accuracy bonus: Based on typing accuracy
- Time bonus: Additional seconds for completing verses

### Timer System
- Starting time: 30 seconds
- Time bonus: 20 seconds + speed bonus + accuracy bonus
- Game over when timer reaches zero

### Performance Metrics
- WPM: Calculated based on correct keystrokes
- Accuracy: Percentage of correct keystrokes
- Error count: Number of incorrect keystrokes

## Setup and Usage

1. Clone the repository:
```bash
git clone https://github.com/Ege-Mert/quran-typing-game.git
```

2. Add sound files to the `sounds` directory:
   - `correct.mp3`: Short sound for correct keystrokes
   - `incorrect.mp3`: Short sound for typing errors
   - `bonus.mp3`: Sound for completing verses

3. Open `index.html` in a web browser to start playing

## Playing the Game

1. Press the "Start Game" button to begin
2. Type the displayed verse exactly as shown
3. Green highlights indicate correct typing
4. Red highlights indicate errors that need correction
5. Complete verses to earn points and time bonuses
6. Use the pause button to take breaks
7. Try to complete all verses before time runs out

## Development

### Prerequisites
- Basic knowledge of HTML, CSS, and JavaScript
- Web browser with localStorage support
- Text editor or IDE

### Adding New Verses
1. Open `js/verses.js`
2. Add new verses to the `QURAN_VERSES` array:
```javascript
{
    text: "Your verse text",
    translation: "English translation"
}
```

### Customizing Styles
- Modify `css/styles.css` for visual changes
- Use CSS variables for consistent theming
- Test responsiveness on different devices

### Modifying Game Logic
- Main game class: `QuranTypingGame` in `game.js`
- Event handlers for user input
- State management and game flow
- Performance calculations and scoring

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Sound effects from [source]
- Inspired by typing tutors and games
- Thanks to contributors and testers