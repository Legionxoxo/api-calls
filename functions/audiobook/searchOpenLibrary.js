const axios = require("axios");

/**
 * Search for book details in Open Library API with optional year filter
 */
const searchOpenLibrary = async (title, year) => {
    let openLibraryURL = `https://openlibrary.org/search.json?title=${encodeURIComponent(
        title
    )}`;

    if (year) {
        openLibraryURL += `&first_publish_year=${year}`;
    }

    try {
        const response = await axios.get(openLibraryURL);
        return response.data;
    } catch (error) {
        console.error(
            `Error fetching details from Open Library for ${title} (${
                year || "Unknown year"
            }):`,
            error.message
        );
        return null;
    }
};

module.exports = searchOpenLibrary;
