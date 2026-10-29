import express from 'express'
import bcrypt from 'bcrypt'

import business from '../business'

//

const app = express()
const port = 3000

app.use(express.json())

//

app.post('/api/auth/signup', (req, res) => {
    const { username, password } = req.body

    return business.handleSignup(username, password)
})

app.post('/api/auth/signin', (req, res) => {
    const { username, password } = req.body

    return business.handleSignin(username, password)
})

// protected routes (need token)

app.get('/api/analysis', (req, res) => {
    const token = req.header('Authorization')

    return business.handleFetchAnalisys(token)
})

app.post('/api/analysis', (req, res) => {
    const token = req.header('Authorization')

    return business.handleNewAnalysis(token, res.body)
})

