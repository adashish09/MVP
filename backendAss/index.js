const express = require('express');
const cors = require('cors');


const geminiRouter = require('./Routes/GeminiRoute.js');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8080;


app.use(geminiRouter);


app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);


















