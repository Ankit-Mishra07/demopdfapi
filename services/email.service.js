const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

async function sendEmail(email, pdfBuffer, fileName) {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Demo Generated PDF",
        text: "Please find the attached PDF.",
        attachments: [
            {
                filename: fileName,
                content: pdfBuffer,
                contentType: "application/pdf"
            }
        ]
    });

    return true;
}

module.exports = sendEmail;



