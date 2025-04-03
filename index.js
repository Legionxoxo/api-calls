const express = require("express");

const movieRouter = require("./routes/detailRouter/movieRouter.js");
const audiobookRouter = require("./routes/detailRouter/audiobookRouter.js");
const animeRouter = require("./routes/detailRouter/anilistRouter.js");
const musicRouter = require("./routes/detailRouter/musicRouter.js");
const subtitleRouter = require("./routes/subtitleRouter/subtitleRouter.js");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the router for API endpoints
app.use("/details", movieRouter);
app.use("/details", audiobookRouter);
app.use("/details", animeRouter);
app.use("/details", musicRouter);
app.use("/subtitles", subtitleRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
