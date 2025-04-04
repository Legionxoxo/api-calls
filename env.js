require("dotenv").config();

/** function to check if a variable is set in the environment
 * @param {{[key: string]: any}} obj - The environment variables to check
 */
function check(obj) {
    for (const key in obj) {
        if (!process.env[key]) {
            throw new Error(`${key} is not set in the environment variables!`);
        }
    }
}

const TVDB_API_KEY = process.env.TVDB_API_KEY || "";
const GENIUS_API_KEY = process.env.GENIUS_API_KEY || "";
const OPENSUBTITLES_API_KEY = process.env.OPENSUBTITLES_API_KEY || "";

check({
    TVDB_API_KEY,
    GENIUS_API_KEY,
    OPENSUBTITLES_API_KEY,
});

module.exports = {
    TVDB_API_KEY,
    GENIUS_API_KEY,
    OPENSUBTITLES_API_KEY,
};
