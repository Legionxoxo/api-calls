const fetchMovieCast = require("./movieCast");
const fetchFullMovieData = require("./movieData");
const fetchMovieDetails = require("./movieDetails");

/**
 * Process movie data into structured format
 */
const processMovie = async (token, { title, year }) => {
    try {
        if (!title || !year) {
            return {
                success: false,
                msg: "Missing title or year",
                data: { title, year, parsed: false },
            };
        }

        const searchResult = await fetchMovieDetails(token, title, year);
        if (!searchResult.success) return searchResult;

        const fullMovieData = await fetchFullMovieData(
            token,
            searchResult.data.tvdb_id
        );
        if (!fullMovieData.success) return fullMovieData;

        const castData = await fetchMovieCast(token, searchResult.data.tvdb_id);

        return {
            success: true,
            msg: "Movie details fetched successfully",
            data: {
                title,
                year,
                parsed: true,
                id: fullMovieData.data?.id || null,
                tvdbTitle: fullMovieData.data?.name || null,
                overview: searchResult.data?.overview || null,
                runtime: fullMovieData.data?.runtime || null,
                genres: fullMovieData.data?.genres?.map((g) => g.name) || [],
                directors: searchResult.data?.director || [],
                rating: fullMovieData.data?.score || null,
                poster: fullMovieData.data?.image || null,
                releaseDate: fullMovieData.data?.first_release?.date || null,
                cast: castData.data || [],
            },
        };
    } catch (error) {
        return {
            success: false,
            msg: `Failed to process movie: ${error.message}`,
            data: null,
        };
    } finally {
        console.log(`Processing completed for movie: ${title}`);
    }
};
module.exports = processMovie;
