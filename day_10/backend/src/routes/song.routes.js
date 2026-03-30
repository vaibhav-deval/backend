const { Router } = require("express");
const songController = require("../controllers/song.controller");
const upload = require("../middlewares/upload.middleware");

const router = Router();

router.post("/", songController.uploadSong);
router.get("/", songController.getSong);


module.exports = router;
