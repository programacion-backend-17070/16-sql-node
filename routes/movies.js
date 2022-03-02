const { Router } = require("express")
const Movie = require("../models/movie")

const router = Router()

// {
//  get: (req, res) => {}
// }
router.get("/", async (req, res) => {
  const movies = await Movie.getAll()
  res.send(movies)
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  console.log("ID: ", id)
  const movie = await Movie.getById(id)
  res.send(movie)
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { body } = req

  await Movie.update(id, body)

  res.sendStatus(200)
})

router.post("/", async (req, res) => {
  const { body } = req

  const id = await Movie.create(body)

  res.status(201).send({ id })
})
router.delete("/:id", async (req, res) => {

  res.sendStatus(200)
})

module.exports = router