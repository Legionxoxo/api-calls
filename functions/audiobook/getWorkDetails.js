const axios = require("axios");

/**
 * Fetch full work details using Open Library work key
 * Returns description/plot if available
 */
const getWorkDetails = async (workKey) => {
    try {
        const response = await axios.get(
            `https://openlibrary.org${workKey}.json`
        );
        const data = response.data;

        // Description may be a string or object
        if (typeof data.description === "string") {
            return data.description;
        } else if (
            typeof data.description === "object" &&
            data.description.value
        ) {
            return data.description.value;
        }

        return null;
    } catch (error) {
        console.error(
            `Failed to fetch work details for ${workKey}:`,
            error.message
        );
        return null;
    }
};

module.exports = getWorkDetails;
