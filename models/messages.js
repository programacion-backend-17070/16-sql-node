const knex = require("knex")

class Message {
  constructor() {
    this.db = knex(
      this.movieDbConfig = {
        client: "sqlite3",
        connection: {
          filename: "./messages.sqlite"
        },
        useNullAsDefault: true
      })
  }

  async init() {
    await this.db.schema.createTableIfNotExists("messages", (table) => {
      table.increments("id")
      table.string("from")
      table.string("to")
      table.string("body")
    })

    await this.db("messages").insert({ from: "juan", to: "lalo", body: "hola"})

    this.db.destroy()
  }
}

module.exports = new Message()