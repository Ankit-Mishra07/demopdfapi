require('dotenv').config();
const express = require('express');
const cors = require("cors")
const pdfRoutes = require("./routes/pdf.routes");
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true}));

app.use("/api/pdf", pdfRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

