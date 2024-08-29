// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const { calculateBearingController } = require('./controllers/bearingController');
const { getNearestPumps } = require('./controllers/petrolPumpsController');
const nearest = require('./controllers/nearest')
const app = express();

// Connect to MongoDB
connectDB();
//testing
// Body parser middleware
app.use(express.json());

// Routes
//app.use('/api/petrolPumps', require('./routes/petrolPumps'));
app.post('/api/bearing', calculateBearingController);
app.get('/api/nearest', getNearestPumps);  // Fixed route path
app.get('/nearest' , nearest.getNearestPumps)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  // Fixed console.log statement
});
