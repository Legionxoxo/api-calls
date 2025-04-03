const authenticateTVDB = require("../../functions/movies/auth");
const processMovie = require("../../functions/movies/processMovie");
const express = require("express");
const router = express.Router();

router.post("/movie-details", async (req, res) => {
    let success = false;
    let msg = "";
    let movieDetails = [];

    try {
        const movies = req.body.movies;
        if (!Array.isArray(movies)) {
            success = false;
            msg = "Invalid request format. Expecting an array of movies.";
            return; // Prevent further execution
        }

        const authResult = await authenticateTVDB();
        if (!authResult.success) {
            success = false;
            msg = "Failed to authenticate with TVDB.";
            return;
        }

        movieDetails = await Promise.all(
            movies.map((movie) => processMovie(authResult.token, movie))
        );

        success = true;
        msg = "Movie details fetched successfully.";
    } catch (error) {
        success = false;
        msg = "Failed to fetch movie details.";
        movieDetails = { error: error.message };
    } finally {
        console.log("Request processing completed for /movie-details");
        res.json({ success, msg, data: movieDetails });
    }
});
module.exports = router;
