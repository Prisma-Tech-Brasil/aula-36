const express = require("express");
const multer = require("multer");
const path = require("node:path");
const videosController = require("../controllers/videosController");

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "../..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

router.get("/", videosController.index);

router.get("/:id", videosController.show);

router.post("/", upload.single("image"), videosController.store);

router.put("/:id", videosController.update);

router.delete("/:id", videosController.delete);

module.exports = router;
