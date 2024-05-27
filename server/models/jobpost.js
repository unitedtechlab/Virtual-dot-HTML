const mongoose = require('mongoose');
const jobform = new mongoose.Schema(
    {
        count: Number,
        jobname: String,
        skills: String,
        jobtype: String,
        location: String,
        job_des: String,
        experience: Number,
        enable: String
    },
    { collection: 'jobpost' })
module.exports = mongoose.model("jobpost", jobform)