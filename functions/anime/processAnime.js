const searchAnime = require("./searchAnime");

/**
 * Process anime data from AniList
 */
const processAnime = async (anime) => {
    try {
        if (!anime.title) {
            return {
                name: anime.name,
                parsed: false,
                success: false,
                msg: "Missing anime title",
            };
        }

        const animeData = await searchAnime(anime.title);

        return animeData
            ? {
                  success: true,
                  msg: "Anime details fetched successfully",
                  id: animeData.id,
                  title: animeData.title.english || animeData.title.romaji,
                  year: animeData.startDate.year || "Unknown",
                  genres: animeData.genres || [],
                  description:
                      animeData.description || "No description available",
                  score: animeData.averageScore || "N/A",
                  coverImage: animeData.coverImage?.large || null,
              }
            : {
                  name: anime.name,
                  parsed: true,
                  success: false,
                  msg: "No matches found in AniList",
              };
    } catch (error) {
        return {
            name: anime.name,
            parsed: true,
            success: false,
            msg: `Failed to fetch anime details: ${error.message}`,
        };
    }
};

module.exports = processAnime;
