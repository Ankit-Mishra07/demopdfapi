const puppeteer =
  process.env.NODE_ENV === "production"
    ? require("puppeteer-core")
    : require("puppeteer");

let chromium;
if (process.env.NODE_ENV === "production") {
  chromium = require("@sparticuz/chromium");
}

async function generatePDF(html) {
  let browser;

  if (process.env.NODE_ENV === "production") {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  } else {
    browser = await puppeteer.launch({
      headless: true,
    });
  }

  try {
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "domcontentloaded",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

module.exports = generatePDF;