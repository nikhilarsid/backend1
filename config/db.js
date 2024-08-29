// backend/config/db.js
const mongoose = require("mongoose");

function connectDb() {
    mongoose.connect(
        "mongodb+srv://nikhilarsid:aperwqE9qxtjrHZv@mydatabase.l7bfu.mongodb.net/Pumps",
        
    )
    .then(() => console.log("Server connected successfully to MongoDB Atlas"))
    .catch((error) => console.log("Error in connecting with database:", error));
}

module.exports = connectDb;

