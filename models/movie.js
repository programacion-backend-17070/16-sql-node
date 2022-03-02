const knex = require("knex")
const fs = require("fs/promises")
const path = require("path")

class Movie {
  constructor() {
    this.movieDb = knex(
      this.movieDbConfig = {
        client: "mysql",
        connection: {
          host: "localhost",
          port: 3306,
          user: "root",
          password: "root",
          database: "movies_db"
        }
      })
  }

  async getAll(name = "", order = "id") {
    console.log(order, name)

    // const where = name ? { name } : {}

    // const movies = await this.movieDb("movies").where(where)
    const movies = await this.movieDb("movies")
      .whereILike("name", `%${name}%`)
      .orderBy(order, "asc")

    return movies
  }

  async getById(id) {
    const movie = await this.movieDb("movies")
      .where({ id })
      .first()

    return movie
  }

  async exists(id) {
    const result = await this.movieDb("movies")
      .where({ id })
      .count("id as count")
      .first()
      
      
    console.log(result.count)
    return result.count == 1
  }

  async update(id, body) {
    console.log(id, body)
    await this.movieDb("movies")
      .where({ id })
      .update(body)
  }

  async create (body) {
    const result = await this.movieDb("movies")
      .insert(body)

    console.log(result[0])

    return result[0]
  }

  async delete (id) {
    const result = await this.movieDb("movies").where({ id }).del()
    console.log(result)
  }

  async loadData () {
    try {
      await this.movieDb.schema.dropTableIfExists("movies")
      await this.movieDb.schema.createTable("movies", (table) => {
        table.increments("id")
        table.string("name")
        table.integer("awards")
        table.string("director")
      })

      const raw = await fs.readFile(path.join(__dirname, "../data/movies.json"))
      const movies = JSON.parse(raw)

      for (const movie of movies) {
        console.log(movie)
        await this.movieDb("movies").insert(movie)
      }
    } catch (e) {
      throw e
    }
    
  }
}

module.exports = new Movie()