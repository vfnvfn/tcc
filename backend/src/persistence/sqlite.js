import { DatabaseSync } from 'node:sqlite'
import { randomUUID } from 'node:crypto'

//

export {
    findUser,
    createUser,
}

//

const FILENAME = './database.db'
const database = new DatabaseSync(FILENAME)

//

database.exec(`
  CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY,
    username TEXT,
    password TEXT
  ) STRICT
`);

//

const findUser = username => database.prepare('SELECT * FROM users WHERE username = ?').get(username)

const createUser = (username, password) => {
    const id = randomUUID()
    
    return database.prepare(`
        INSERT INTO users (id, username, password)
        VALUES (?, ?, ?)
        RETURNING id, username, password
    `).get(id, username, password)
}
