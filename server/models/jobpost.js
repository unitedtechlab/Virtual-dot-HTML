const { Int32 } = require('bson');
const mongoose = require('mongoose');
const jobform = new mongoose.Schema({
    count: Int32,
    jobname: String,
    skills: String,
    jobtype: String,
    location: String,
    job_des: String,
    experience: Int32,
    enable: Boolean
})
module.exports = mongoose.model("jobPost", jobform)