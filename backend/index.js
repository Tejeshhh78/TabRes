const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const statusRouter = require('./routes/status');
const usersRouter = require('./routes/users');

// Load environmet variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/status', statusRouter);
app.use('/api/users', usersRouter);

// Standard route
app.get('/', (req, res) => {
  res.send('TabRes ist aktiv');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
