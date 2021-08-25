const express = require('express');
const router = express.Router();
const script_controller = require('../controllers/script.controller');

router.get('/hello', script_controller.script_hello);

module.exports = router;