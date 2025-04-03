const { default: axios } = require("axios");

/**
 * Fetch full movie data from TVDB
 */
const fetchFullMovieData = async (token, tvdbId) => {
    try {
        const response = await axios.get(
            `https://api4.thetvdb.com/v4/movies/${tvdbId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return {
            success: true,
            data: response.data.data,
            msg: "Full movie data fetched",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            msg: `Failed to fetch full movie data: ${error.message}`,
        };
    }
};
module.exports = fetchFullMovieData;
