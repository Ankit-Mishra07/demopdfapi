const axios = require("axios");

async function sendWhatsApp(phone, pdfUrl, fileName) {

    await axios.post(`https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,
        {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: phone,
            type: "document",
            document: {
                link: pdfUrl,
                filename: fileName
            }
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content-Type": "application/json"
            }
        }
    );

    return true;
}

module.exports = sendWhatsApp;