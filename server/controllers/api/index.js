"use strict";

let router = require('express').Router();

let channels = require('./channels');

router.use('/channels', channels);

module.exports = router;