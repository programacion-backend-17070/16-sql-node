// IIFE
(async () => {
  const Movie = require("./models/movie")
  const express = require("express")
  const app = express()
  const movieRouter = require("./routes/movies")
  try {
    // await Movie.loadData()
    console.log("se creo la tabla")
    app.use(express.json()) // JSON parse

    app.use("/api/movies", movieRouter)

    app.listen(
      8080,
      () => console.log("Listening")
    )
  } catch (e) {
    console.log(e)
    console.log("could not start servers")
  }
})()