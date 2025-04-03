const fetchMusic = require("../../functions/music/fetchMusic");
const processMusic = require("../../functions/music/processMusic");
const express = require("express");
const router = express.Router();

/**
 * Main route handler: Fetch music details
 */
router.post("/music-details", async (req, res) => {
    let response = { success: false, msg: "", data: [] };

    try {
        const { music } = req.body;
        if (!Array.isArray(music) || music.length === 0) {
            response.msg = "No valid music data provided.";
            return res.status(400).json(response);
        }

        const musicDetails = await Promise.all(
            music.map(async ({ title, year, artist }) => {
                if (
                    !title ||
                    typeof title !== "string" ||
                    title.trim().length === 0
                ) {
                    return { error: "Invalid title parameter" };
                }

                const geniusResults = await fetchMusic(title.trim());

                if (geniusResults.length === 0) {
                    return { error: `No matches found in Genius for ${title}` };
                }

                return (
                    processMusic(geniusResults, year, artist) || {
                        error: `No valid match for ${title}`,
                    }
                );
            })
        );

        response.success = true;
        response.msg = "Music details fetched successfully.";
        response.data = musicDetails;
    } catch (error) {
        console.error("Error in /music-details route:", error.message);
        response.msg = `Error fetching music details: ${error.message}`;
    } finally {
        res.json(response);
    }
});

module.exports = router;
