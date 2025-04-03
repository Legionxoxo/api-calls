require("dotenv").config();
const axios = require("axios");
const { TVDB_API_KEY, TVDB_PIN, TVDB_USERNAME } = process.env;

/**
 * Authenticate with TVDB and return token
 */
const authenticateTVDB = async () => {
    let response = null;
    let success = false;
    let token = null;
    let msg = "";

    try {
        response = await axios.post(
            "https://api4.thetvdb.com/v4/login",
            { apikey: TVDB_API_KEY, pin: TVDB_PIN, username: TVDB_USERNAME },
            { headers: { "Content-Type": "application/json" } }
        );

        success = true;
        token = response.data.data.token;
        msg = "Authentication successful";
    } catch (error) {
        success = false;
        token = null;
        msg = `TVDB Authentication failed: ${error.message}`;
    } finally {
        return { success, token, msg };
    }
};

module.exports = authenticateTVDB;
