const { default: axios } = require("axios");

/**
 * Fetch movie cast details
 */
const fetchMovieCast = async (token, tvdbId) => {
    try {
        const response = await axios.get(
            `https://api4.thetvdb.com/v4/movies/${tvdbId}/extended`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const cast =
            response.data.data?.characters?.map(
                ({ personName, name, peopleId, personImgURL }) => ({
                    name: personName || null,
                    role: name || null,
                    id: peopleId || null,
                    image: personImgURL || null,
                })
            ) || [];

        return { success: true, data: cast, msg: "Cast fetched successfully" };
    } catch (error) {
        return {
            success: false,
            data: [],
            msg: `Failed to fetch cast: ${error.message}`,
        };
    }
};
module.exports = fetchMovieCast;
