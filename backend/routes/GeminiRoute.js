const express = require('express');
const { geminiGeneration } = require('../../backendAss/Controllers/Gemini.js');

const router = express.Router();

router.post('/generate', geminiGeneration);

module.exports = router;