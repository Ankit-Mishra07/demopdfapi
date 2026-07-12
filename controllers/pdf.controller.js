const {v4: uuidv4} = require("uuid");

const generatePDF = require("../services/pdf.service");
const uploadPDF = require("../services/s3.service");
const sendEmail = require("../services/email.service");
const sendWhatsApp = require("../services/whatsapp.service");

const generate = async (req, res) => {
    try {
        const {html, email, phone} = req.body;
        
        if(!html) {
            return res.status(400).json({success: false, message: "HTML is required"});
        }
        
        const fileName = `${uuidv4()}.pdf`;

        const pdfBuffer = await generatePDF(html);
        
        const pdfUrl = await uploadPDF(pdfBuffer, fileName);

        if(email) {
            await sendEmail(email, pdfBuffer, fileName);
        }
        // if(phone) {
        //     await sendWhatsApp(phone, pdfUrl, fileName);
        // }

        return res.status(200).json({
            success: true,
            message: "PDF generated successfully.",
            fileName,
            pdfUrl
        })
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {generate};

