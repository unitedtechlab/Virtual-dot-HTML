const express = require('express')
require("./models/config")
require('dotenv').config();
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors());
const getport = process.env.PORT
const FormData = require("./models/User")
const JobFormField = require("./models/jobpost")

app.post("/contactus", async (request, response) => {
    try {
        const user = new FormData(request.body);
        let result = await user.save()
        response.status(201).json(result);
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error" })
        console.error('Error fetching products:', error);
    }
})
app.get("/career-jobpost", async (request, response) => {
    try {
        let jobs = await JobFormField.find({ enable: "true" });
        if (jobs.length > 0) {
            response.status(200).send(jobs);
        } else {
            response.status(400).send({ result: "No data found" });
        }
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error" })
        console.error('Error fetching products:', error);
    }
})
app.get("/career-job", async (request, response) => {
    let result = await JobFormField.findOne({ count: Number(request.query.id) })
    if (result) {
        response.status(200).send(result)
    } else {
        response.status(400).send({ result: "no result found" })
    }
})

app.listen(getport, () => {
    console.log("Server is running on port", getport)
})