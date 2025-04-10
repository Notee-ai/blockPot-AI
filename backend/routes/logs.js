const express = require('express');
const router = express.Router();
const { getLogs, postLog } = require('../controllers/logController');

router.get('/', getLogs);
router.post('/', postLog);

module.exports = router;
