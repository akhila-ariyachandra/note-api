// Import the dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Note from "./models/noteModel";

// Create a new instance of the express server
const app = express();

// Apply middleware
app.use(bodyParser.json({ type: "application/json" })).use(
  cors({
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "x-access-token"
    ]
  })
);

// Route to save a new note - POST method
app.post("/note", async (req, res) => {
  try {
    // Save note to DB
    const result = await Note.create({
      title: req.body.title,
      content: req.body.content
    });

    // Send the result of the save function as the server response
    return res.json(result);
  } catch (error) {
    // Handle error
    // Display error in console
    console.log(error);
  }
});

// Route to get all the notes - GET method
app.get("/note", async (req, res) => {
  try {
    // Get all notes from the database
    const result = await Note.find({}).exec();

    // Send the results as the server response
    return res.json(result);
  } catch (error) {
    // Handle error
    // Display error in console
    console.log(error);
  }
});

// Route to get one note based on the ID - GET method
app.get("/note/:id", async (req, res) => {
  try {
    // Get the ID
    const id = req.params.id;

    // Find the note from the ID
    const result = await Note.findById(id).exec();

    // Send the result as the server response
    return res.json(result);
  } catch (error) {
    // Handle error
    // Display error in console
    console.log(error);
  }
});

// Route to update a note - PUT method
app.put("/note/:id", async (req, res) => {
  try {
    // Get the ID
    const id = req.params.id;

    // Update the note
    const result = await Note.findByIdAndUpdate(id, {
      title: req.body.title,
      content: req.body.content
    }).exec();

    // Send the result as the server response
    return res.json(result);
  } catch (error) {
    // Handle error
    // Display error in console
    console.log(error);
  }
});

// Route to delete a note - DELETE method
app.delete("/note/:id", async (req, res) => {
  try {
    // Get the ID
    const id = req.params.id;

    // Delete the note
    const result = await Note.findByIdAndDelete(id).exec();

    // Send the result as the server response
    return res.json(result);
  } catch (error) {
    // Handle error
    // Display error in console
    console.log(error);
  }
});

// Set port number
const portNo = process.env.PORT || 8080;

// Start server
app.listen(portNo, () => {
  console.log(`> Server listening at http://localhost:${portNo}`);
});
