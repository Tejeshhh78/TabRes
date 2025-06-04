const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bookingsRouter = require('./routes/bookings');
const tablesRouter = require('./routes/tables')
const usersRouter = require('./routes/users');

// Load environmet variables
dotenv.config();

// Configure server
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

/*
// Verbindung zur MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error('MongoDB Verbindungsfehler:', err));
*/

// Routes
app.use('/api/bookings', bookingsRouter);
app.use('/api/tables', tablesRouter)
app.use('/api/users', usersRouter);

// Standard route
app.get('/', (req, res) => {
  res.send('TabRes-API ist aktiv');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
