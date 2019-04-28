const express = require("express");

const router = express.Router();
const searchController = require("../controllers/search");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");


router.get("",checkAuth, searchController.searchItems);



module.exports = router;