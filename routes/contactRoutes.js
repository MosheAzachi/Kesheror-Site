const express = require('express');
const contactController = require('./../controllers/contactConroller');
const router = express.Router();

router.post('/', contactController.createContact);

module.exports = router;
