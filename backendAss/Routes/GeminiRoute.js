const express = require('express');
const { geminiGeneration } = require('../Controllers/Gemini.js');

const router = express.Router();


router.post('/generate', geminiGeneration)


module.exports = router;