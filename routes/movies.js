const { Router } = require("express")
const Movie = require("../models/movie")

const router = Router()

router.get("/", async (req, res) => {
  const { order, name } = req.query

  const movies = await Movie.getAll(name, order)

  res.send(movies)
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  const movie = await Movie.getById(id)
  if (!movie) {
    res.sendStatus(404)
  } else {
    res.send(movie)
  }
  
})

router.put("/:id", async (req, res) => {
  const { body } = req
  const { id } = req.params
  
  const exists = await Movie.exists(id)

  console.log(exists, id)
  if (!exists) {
    res.sendStatus(404)
    return
  }

  await Movie.update(id, body)

  res.sendStatus(200)
})

router.post("/", async (req, res) => {
  const { body } = req

  const id = await Movie.create(body)

  res.status(201).send({ id })

})
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  const exists = await Movie.exists(id)

  console.log(exists, id)
  if (!exists) {
    res.sendStatus(404)
    return
  }

  await Movie.delete(id)

  res.sendStatus(200)
})

module.exports = router