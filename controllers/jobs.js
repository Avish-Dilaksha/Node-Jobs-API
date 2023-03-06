const Job = require('../models/jobs')
const asyncWrapper = require('../middlewares/asyncWrapper')
const {createCustomError} = require('../errors/custom-api-error')
//const { StatausCodes } = require('http-status-codes')

const getAllJobs = asyncWrapper(async (req, res) => {
    const jobs = await Job.find({}).sort('createdAt')
    res.status(200).json({tasks: jobs})
})

const getJob = asyncWrapper(async (req, res, next) => {
        const {id:jobID} = req.params
        const job = await Job.findOne({_id:jobID})
        if (!job)  {
            return next(createCustomError(`No job with ID : ${jobID}`, 404))
        }

        res.status(200).json({ job: job })
})

const createJob = asyncWrapper(async (req, res) => {
    const job = await Job.create(req.body)
    res.status(201).json({job: job})
})

const deleteJob = asyncWrapper(async (req, res) => {
    const {id:jobID} = req.params
    const job = await Job.findOneAndDelete({_id:jobID})
    if (!job)  {
        return next(createCustomError(`No job with ID : ${jobID}`, 404))
    }

    res.status(200).json({ job: null, status: 'success' })
})

const updateJob = asyncWrapper(async (req, res) => {
        const {id : jobID} = req.params

        const job = await Job.findOneAndUpdate({_id : jobID}, req.body, {
            new:true,
            runValidators:true,
        })

        if(!job) {
            return next(createCustomError(`No job with ID : ${jobID}`, 404))
        }

        res.status(200).json({job: job})
})



module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}