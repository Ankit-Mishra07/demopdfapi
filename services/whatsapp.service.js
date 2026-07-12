// const axios = require("axios");

// async function sendWhatsApp(phone, pdfUrl, fileName) {

//     console.log("PHONE_NUMBER_ID:", process.env.PHONE_NUMBER_ID);
// console.log("TOKEN EXISTS:", !!process.env.WHATSAPP_TOKEN);
// console.log("TOKEN LENGTH:", process.env.WHATSAPP_TOKEN?.length);

//     await axios.post(`https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,
//         {
//             messaging_product: "whatsapp",
//             recipient_type: "individual",
//             to: phone,
//             type: "document",
//             document: {
//                 link: pdfUrl,
//                 filename: fileName
//             }
//         },
//         {
//             headers: {
//                 Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//                 "Content-Type": "application/json"
//             }
//         }
//     );

//     return true;
// }

// module.exports = sendWhatsApp;


// NHLGSTHUZVPJYE3T4KUB6J24
const twilio = require("twilio");

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function sendWhatsApp(phone, pdfUrl, fileName) {
    const formattedPhone = phone.startsWith("+")
    ? phone
    : `+${phone}`;
    const response = await client.messages.create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${formattedPhone}`,
        body: `Please find your PDF attached.`,
        mediaUrl: [pdfUrl],
    });
    return response;
}

module.exports = sendWhatsApp;