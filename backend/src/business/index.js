import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//

import { tryCatch, fold } from '../either.js'

import { config } from '../config.js'

import * as persistence from '../persistence/index.js'

//

export {
    handleSignup,
    handleSignin,
}

//

const handleSignup = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10)

    if (persistence.findUser(username)) return { message: 'user already registered' }

    return persistence.createUser(username, hashedPassword)
}

const handleSignin = async (username, password) => {
    const user = persistence.findUser(username)
    if (!user) return { message: 'user does not exist' }
    
    const match = await bcrypt.compare(password, user.password)
    if (match) return { token: jwt.sign({ ...user, }, config.jwtSecret, { expiresIn: '1h' }) }

    return { message: 'unable to sign in user' }
}

const handleFetchAnalysis = token => {
    if (!token) return { message: 'invalid token' }

    fold(tryCatch(() => jwt.verify(token, config.jwtSecret)),
         console.error,
         console.info)
}

const handleNewAnalysis = (token, body) => {
    
}
