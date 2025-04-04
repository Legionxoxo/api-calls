const axios = require("axios");
require("dotenv").config();

const { OPENSUBTITLES_API_KEY } = require("../../env");

/**
 * Fetch subtitles from OpenSubtitles API
 * @param {string} title - Movie or TV show title
 * @param {string} language - Subtitle language
 * @returns {Promise<Array>} - List of subtitles or empty array
 */
const fetchSubtitles = async (title, language) => {
    try {
        const response = await axios.get(
            "https://api.opensubtitles.com/api/v1/subtitles",
            {
                headers: { "Api-Key": OPENSUBTITLES_API_KEY },
                params: { query: title, languages: language },
            }
        );
        return response.data.data || [];
    } catch (error) {
        console.error(`Error fetching subtitles for ${title}:`, error.message);
        return [];
    }
};

module.exports = fetchSubtitles;
