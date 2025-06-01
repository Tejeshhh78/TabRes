const express = require('express');
const app = express();
const statusRouter = require('./routes/status');

app.use(express.json());
app.use('/api/status', statusRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
