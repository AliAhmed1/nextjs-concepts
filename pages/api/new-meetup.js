// /api/anew-meetup.js
// import { MongoClient } from "mongodb";

// POST 
const { MongoClient } = require('mongodb');

async function handler(req, res) {
    try {
        const data = req.body;

        const client = new MongoClient('mongodb+srv://saliahmed:admin@cluster0.5ee5ilu.mongodb.net/?retryWrites=true&w=majority');

        await client.connect(); // Connect to the MongoDB server

        const db = client.db("meetups");
        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        client.close(); // Close the MongoDB connection

        res.status(201).json({ message: "Inserted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
}


export default handler;