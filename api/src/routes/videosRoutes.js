const express = require("express");
const videosController = require("../controllers/videosController");
const upload = require("../utils/uploadHandle");

const router = express.Router();

router.get("/", videosController.index);

router.get("/:id", videosController.show);

router.post("/", upload.single("image"), videosController.store);

router.put("/:id", videosController.update);

router.delete("/:id", videosController.delete);

module.exports = router;
