const express = require('express')
require("./models/config")
require('dotenv').config();
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors());
const getport = process.env.PORT
const FormData = require("./models/User")

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
        console.log("hello")
    } catch (error) {

    }
})

app.listen(getport, () => {
    console.log("Server is running on port", getport)
})