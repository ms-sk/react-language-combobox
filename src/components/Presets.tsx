const EUROPE_TOP_FIVE = ["en", "ru", "de", "fr", "it"];
const WORLD_TOP_FIVE = ["en", "zh", "hi", "es", "ar"];

export const PRESETS = {
    EUROPE_TOP_FIVE,
    EUROPE_TOP_TEN: [...EUROPE_TOP_FIVE, "es", "tr", "pl", "uk", "nl"],

    EUROPE_TOP_20: [
        ...EUROPE_TOP_FIVE, "es", "tr", "pl", "uk", "nl",
        "ro", "pt", "sv", "el", "hu", "cs", "bg", "sr", "da", "fi"
    ],

    WORLD_TOP_FIVE,
    WORLD_TOP_TEN: [...WORLD_TOP_FIVE, "fr", "bn", "pt", "ru", "id"],

    WORLD_TOP_20: [...WORLD_TOP_FIVE, "fr", "bn", "pt", "ru", "id",
        "ur",
        "de",
        "ja",
        "vi",
        "te",
        "tr",
        "ko",
        "it",
        "fa"
    ]
};