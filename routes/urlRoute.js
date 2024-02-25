let express = require("express");
let router = express.Router();
let handlenewid = require("../controllers/generateid");

router.route("/").post(handlenewid);

module.exports = router;
