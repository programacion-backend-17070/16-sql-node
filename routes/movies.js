const { Router } = require("express")

const router = Router()

router.get("/", async (req, res) => {

  res.send("OK")
})

router.get("/:id", async (req, res) => {
  res.send("OK")
})

router.put("/:id", async (req, res) => {
  res.sendStatus(200)
})

router.post("/", async (req, res) => {
  res.status(201).send("OK")

})
router.delete("/:id", async (req, res) => {

  res.sendStatus(200)
})

module.exports = router