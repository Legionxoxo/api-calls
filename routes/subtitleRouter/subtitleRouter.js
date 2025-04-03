const express = require("express");
const fetchSubtitles = require("../../functions/subtitle/fetchSubtitle");
const router = express.Router();

/**
 * Route to fetch subtitles
 */
router.post("/fetch-subtitles", async (req, res) => {
    let response = { success: false, msg: "", data: [] };

    try {
        const { title, language } = req.body;

        if (!title || !language) {
            response.msg =
                "Title and language are required to fetch subtitles.";
            return res.status(400).json(response);
        }

        console.log(`Fetching subtitles for: ${title} in ${language} language`);

        // Fetch subtitles from OpenSubtitles API
        const subtitles = await fetchSubtitles(title, language);

        if (subtitles.length > 0) {
            response.success = true;
            response.msg = "Subtitles fetched successfully.";
            response.data = subtitles;
        } else {
            response.msg = `No subtitles found for ${title} in ${language}`;
        }
    } catch (error) {
        console.error(`Error fetching subtitles for ${title}:`, error.message);
        response.msg = "Failed to fetch subtitles";
    } finally {
        res.json(response);
    }
});

module.exports = router;
