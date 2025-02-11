const QURAN_VERSES = [
    {
        text: "Bismillahirrahmanirrahim",
        translation: "In the name of Allah, the Most Gracious, the Most Merciful"
    },
    {
        text: "Elhamdulillahi rabbil alemin",
        translation: "All praise is due to Allah, Lord of the worlds"
    },
    {
        text: "Errahmanirrahim",
        translation: "The Most Gracious, the Most Merciful"
    },
    {
        text: "Maliki yevmiddin",
        translation: "Master of the Day of Judgment"
    },
    {
        text: "İyyake na'budu ve iyyake nestain",
        translation: "You alone we worship, and You alone we ask for help"
    },
    {
        text: "İhdinas sıratel mustekim",
        translation: "Guide us to the straight path"
    }
];

// Function to get random verses
function getRandomVerses(count = 5) {
    const shuffled = [...QURAN_VERSES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to get verses in sequential order
function getSequentialVerses(startIndex = 0, count = 5) {
    return QURAN_VERSES.slice(startIndex, startIndex + count);
}