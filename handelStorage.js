import fs from "fs";
import multer from "multer";

const productImgs = "./uploads/productImgs";
const collectionImgs = "./uploads/collectinImgs";
const profileImgs = "./uploads/profileImgs";

// ✅ Product Storage
const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, productImgs);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: productStorage });

// ✅ Collection Storage
const collectionStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, collectionImgs);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadCollection = multer({ storage: collectionStorage });

// ✅ Profile Storage
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, profileImgs);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadProfile = multer({ storage: profileStorage });

export { upload, uploadCollection, uploadProfile };
