const searchOpenLibrary = require("./searchOpenLibrary");

/**
 * Process a single book title to fetch details
 */
const processBook = async ({ name = "Unknown", title, year }) => {
    if (!title) {
        return {
            name,
            error: "No title provided",
            parsed: false,
        };
    }

    try {
        const openLibraryData = await searchOpenLibrary(title, year);

        if (!openLibraryData || openLibraryData.numFound === 0) {
            console.log(
                `No matches found for ${title} (${year || "Unknown year"})`
            );
            return {
                name,
                title,
                year,
                parsed: true,
                error: "No matches found in Open Library",
            };
        }

        const bookData = openLibraryData.docs[0]; // Get the first match
        return {
            name,
            title: bookData.title || title,
            author: bookData.author_name
                ? bookData.author_name.join(", ")
                : "Unknown",
            first_publish_year: bookData.first_publish_year || year || null,
            cover_image: bookData.cover_i
                ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`
                : null,
            ebook_available: bookData.ebook_count_i > 0,
            audiobook_available: bookData.has_fulltext,
        };
    } catch (error) {
        console.error(
            `Error fetching details for ${title} (${year || "Unknown year"}):`,
            error.message
        );
        return {
            name,
            title,
            year,
            parsed: true,
            error: `Failed to fetch details: ${error.message}`,
        };
    }
};

module.exports = processBook;
