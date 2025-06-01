const express = require('express');
const app = express();

const statusRouter = require('./routes/status');
const usersRouter = require('./routes/users');

app.use(express.json());

app.use('/api/status', statusRouter);
app.use('/api/users', usersRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
