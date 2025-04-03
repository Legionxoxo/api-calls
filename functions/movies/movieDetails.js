const { default: axios } = require("axios");

/**
 * Fetch movie details from TVDB
 */
const fetchMovieDetails = async (token, title, year) => {
    try {
        const response = await axios.get("https://api4.thetvdb.com/v4/search", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            params: { query: title, year, type: "movie" },
        });

        const movie = response.data.data?.[0] || null;
        return movie
            ? { success: true, data: movie, msg: "Movie found" }
            : {
                  success: false,
                  data: null,
                  msg: `No movie found for ${title}`,
              };
    } catch (error) {
        return {
            success: false,
            data: null,
            msg: `Failed to fetch movie details: ${error.message}`,
        };
    }
};
module.exports = fetchMovieDetails;
