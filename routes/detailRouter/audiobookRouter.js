const express = require("express");
const processBook = require("../../functions/audiobook/processBook");
require("dotenv").config();

const router = express.Router();

/**
 * POST /book-details
 * Accepts book titles from the request body and fetches details from Open Library API.
 */
router.post("/book-details", async (req, res) => {
    let success = false;
    let msg = "";
    let audiobookDetails = [];

    try {
        const { books } = req.body; // Expecting an array of books [{ name, title }]
        if (!Array.isArray(books) || books.length === 0) {
            msg = "Invalid request. Provide an array of books.";
            return res.status(400).json({ success, msg, data: [] });
        }

        console.log("Processing books...");
        audiobookDetails = await Promise.all(
            books.map((book) => processBook(book))
        );

        success = true;
        msg = "Book details fetched successfully";
    } catch (error) {
        console.error("Error processing book details:", error.message);
        msg = `Failed to process books: ${error.message}`;
    } finally {
        console.log("Book details request completed.");
        return res.json({ success, msg, data: audiobookDetails });
    }
});

module.exports = router;
