// Import the dependency
import mongoose from "mongoose";

// The database path
const dbPath = null;

// Connect the database
mongoose.connect(dbPath, {
  useNewUrlParser: true
});

// Check if the API successfully connected to the database
const db = mongoose.connection;
db.on("error", () => {
  console.log("> error occurred from the database");
});
db.once("open", () => {
  console.log("> successfully opened the database");
});

// Export the database instance
export default mongoose;
