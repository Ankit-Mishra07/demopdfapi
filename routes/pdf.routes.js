const router = require("express").Router();
const pdfController = require("../controllers/pdf.controller");


router.post('/generate', pdfController.generate)

module.exports = router;
