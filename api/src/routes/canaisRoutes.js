const express = require("express");
const canaisController = require("../controllers/canaisController");
const upload = require("../utils/uploadHandle");

const router = express.Router();

router.get("/", canaisController.index);

router.get("/:id", canaisController.show);

router.post("/", upload.single("image"), canaisController.store);

router.put("/:id", canaisController.update);

router.delete("/:id", canaisController.delete);

module.exports = router;
