const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory = path.resolve(__dirname, "../uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

// Disk storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter — allow only common image types
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|pdf/;
  const mimeOk = allowed.test(file.mimetype);
  const extOk = allowed.test(path.extname(file.originalname).toLowerCase());

  if (mimeOk && extOk) {
    cb(null, true);
  } else {
    cb(
      new Error("Only image files (jpeg, jpg, png, gif, webp) and PDFs are allowed."),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

module.exports = upload;
