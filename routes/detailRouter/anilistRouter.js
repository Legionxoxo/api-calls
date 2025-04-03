const processAnime = require("../../functions/anime/processAnime");
const express = require("express");

const router = express.Router();

/**
 * POST Route: Fetch anime details from AniList
 */
router.post("/anime-details", async (req, res) => {
    let responsePayload = {
        success: false,
        msg: "Something went wrong",
        data: [],
    };

    try {
        const animes = req.body.animes;

        if (!Array.isArray(animes)) {
            responsePayload.msg =
                "Invalid request format. Expected an array of animes.";
            return res.status(400).json(responsePayload);
        }

        const animeDetails = await Promise.all(animes.map(processAnime));
        responsePayload = {
            success: true,
            msg: "Animes fetched successfully",
            data: animeDetails,
        };
    } catch (error) {
        responsePayload.msg = error.message;
    } finally {
        return res.json(responsePayload);
    }
});

module.exports = router;
