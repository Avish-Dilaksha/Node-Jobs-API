require('dotenv').config()
require('express-async-errors')

const express = require('express')
const jobs = require('./routes/jobs')
const connectDB = require('./db/connect')

const app = express()

const errorHandlerMiddleware = require('./middlewares/error-handler')


app.use(express.json())

const port = process.env.PORT || 3000

app.use('/api/v1/jobs', jobs)

app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()