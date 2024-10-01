import express from 'express'
import { config } from 'dotenv'

config()

const app = express()

const port = process.env.PORT || 3333

app.get('/', (request, response) => {
    response.send('Ok')
})

app.listen(port, () => {
    console.log('App em execução.')
})
