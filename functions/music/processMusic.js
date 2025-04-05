/**
 * Process and format music data
 */
const processMusic = (musicData, year, artist) => {
    let filteredResults = musicData;

    if (year) {
        filteredResults = filteredResults.filter((song) => {
            const songYear = song.release_date
                ? new Date(song.release_date).getFullYear()
                : null;
            return songYear === parseInt(year);
        });
    }

    if (artist) {
        filteredResults = filteredResults.filter((song) =>
            song.primary_artist.name
                .toLowerCase()
                .includes(artist.toLowerCase())
        );
    }

    const bestMatch =
        filteredResults.length > 0 ? filteredResults[0] : musicData[0];
    if (!bestMatch) return null;

    return {
        id: bestMatch.id,
        albumTitle: bestMatch.title,
        artist: bestMatch.primary_artist.name,
        releaseYear: bestMatch.release_date
            ? new Date(bestMatch.release_date).getFullYear()
            : "Unknown",
        coverImage: bestMatch.song_art_image_url,
        description: `View lyrics at: ${bestMatch.url}`,
        featuredArtists:
            bestMatch.featured_artists?.map((featArtist) => ({
                name: featArtist.name,
                image: featArtist.image_url,
            })) || [],
    };
};

module.exports = processMusic;
