require('dotenv').config()
require('express-async-errors')

const express = require('express')

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const jobs = require('./routes/jobs')
const connectDB = require('./db/connect')

const app = express()

const errorHandlerMiddleware = require('./middlewares/error-handler')

// extra packages
app.set('trust proxy', 1)
app.use(rateLimiter({
  window: 15*60* 1000, // 15 mins
  max: 100, //limit each IP to 100 requests per window
}))

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

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