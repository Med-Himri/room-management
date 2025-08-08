const express = require("express");
const connectDB = require("./config/config");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const userRoutes = require("./routes/user.routes");
const roomRoutes = require("./routes/room.routes");


// Mount routes
app.use("/api/user", userRoutes);

app.use('/api/rooms', roomRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
