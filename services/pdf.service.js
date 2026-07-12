const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

async function generatePDF(html) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true
    });
    page = await browser.newPage()
    await page.setContent(html, {
        waitUntil: "domcontentloaded"
    })

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground:true,
        margin: {
            top: "20px",
            bottom: "20px",
            left: "20px",
            right: "20px",
        }
    })
    await browser.close();

    return pdfBuffer;
}

module.exports = generatePDF;
