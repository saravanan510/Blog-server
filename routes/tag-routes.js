const express = require("express");
const router = express.Router();
const tagCltr = require("../app/controllers/tagCltr");

router.post("/", tagCltr.create);
router.get("/", tagCltr.show);
router.put("/", tagCltr.update);
module.exports = router;
