// IIFE
(async () => {
  const express = require("express")
  const app = express()

  try {
    app.use(express.json())

    app.get("/", (rq, rs) => rs.send("Hola"))

    app.listen(
      8080,
      () => console.log("Listening")
    )
  } catch (e) {
    console.log(e)
    console.log("could not start servers")
  }
})()