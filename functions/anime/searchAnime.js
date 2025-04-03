const axios = require("axios");

/**
 * Search for anime details using AniList API
 */
const searchAnime = async (title) => {
    try {
        const query = `
        query ($search: String) {
            Media(search: $search, type: ANIME) {
                id
                title {
                    romaji
                    english
                    native
                }
                type
                format
                status
                description
                startDate {
                    year
                }
                genres
                averageScore
                coverImage {
                    large
                }
            }
        }`;

        const response = await axios.post(
            "https://graphql.anilist.co",
            { query, variables: { search: title } },
            { headers: { "Content-Type": "application/json" } }
        );

        return response.data.data.Media || null;
    } catch (error) {
        console.error(
            `Error fetching AniList data for ${title}:`,
            error.message
        );
        return null;
    }
};

module.exports = searchAnime;
