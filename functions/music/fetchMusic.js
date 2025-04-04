const axios = require("axios");
require("dotenv").config();

const { GENIUS_API_KEY } = require("../../env");

/**
 * Fetch music details from Genius API
 */
const fetchMusic = async (title) => {
    try {
        const response = await axios.get(
            `https://api.genius.com/search?q=${encodeURIComponent(title)}`,
            {
                headers: { Authorization: `Bearer ${GENIUS_API_KEY}` },
            }
        );
        return response.data.response.hits.map((hit) => hit.result) || [];
    } catch (error) {
        console.error(
            `Error fetching from Genius for ${title}:`,
            error.message
        );
        return [];
    }
};

module.exports = fetchMusic;
