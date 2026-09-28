const QRCode = require("qrcode");

/**
 * Generate a QR code as a base64 Data URL string.
 * @param {string} text - The string to encode in the QR code
 * @returns {Promise<string>} Base64 PNG data URL
 */
const generateQRCode = async (text) => {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 0.92,
      margin: 1,
      width: 300,
    });
    return dataUrl;
  } catch (error) {
    throw new Error("Failed to generate QR code: " + error.message);
  }
};

module.exports = generateQRCode;
