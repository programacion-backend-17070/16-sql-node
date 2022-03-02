const knex = require("knex")
const fs = require("fs/promises")
const path = require("path")

class Movie {
  constructor() {
    // this.db = knex({
    //   client: "mysql",
    //   connection: {
    //     host: "localhost",
    //     port: 3306,
    //     user: "root",
    //     password: "root",
    //     database: "movies_db"
    //   }
    // })

    this.db = knex({
      client: "sqlite3",
      connection: {
        filename: "./ecommerce/movies.sqlite"
      },
      useNullAsDefault: true
    })
  }
  // getAll() sin parametros
  // getAll('te')
  async getAll(name = '') {
    // select * from movies where name LIKE '%undefined%'

    // el where iLike no es soportado por sqlite3
    const movies = await this.db("movies").orderBy("name", "desc") // select * from movies
    console.log(movies)
    return movies
  }

  async getById(id) {
    // select * from movies where id = 1
    const movie = await this.db("movies")
      .where({ id })
      .first()

    return movie
  }

  async create(movie) {
    const result = await this.db("movies").insert(movie)

    // [ Numero ]
    console.log(result)

    return result[0]
  }

  async update(id, movie) {
    // update movies set VALUES where id = id
    await this.db("movies")
      .where({ id })
      .update(movie)
  }

  async delete(id) {
    // delete from movies where id = id
    const result = await this.db("movies")
      .where({ id })
      .del()

    console.log("Numero de registros borrados: ", result)
  }

  // seed de datos
  async loadData() {
    
  }
}

module.exports = new Movie()