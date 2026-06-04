const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const path = require("path");

async function extractText(buffer, originalname) {
  const ext = path.extname(originalname).toLowerCase();

  if (ext === ".pdf") {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (ext === ".docx" || ext === ".doc") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (ext === ".txt") {
    return buffer.toString("utf-8");
  }

  throw new Error(
    `Unsupported file type: ${ext}. Please upload PDF, DOCX, or TXT.`
  );
}

module.exports = { extractText };