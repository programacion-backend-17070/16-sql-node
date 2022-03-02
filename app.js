(async () => {
  const express = require("express")
  const Movie = require("./models/movie")
  const movieRouter = require("./routes/movies")
  const app = express()

  try {
    await Movie.loadData()

    app.use(express.json())

    app.get("/", (rq, rs) => rs.send("Hola"))

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