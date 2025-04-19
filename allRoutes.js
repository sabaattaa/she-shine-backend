import express from "express"; 
import { Login } from "./auth/authApi.js";
import { addCollection, addProduct, addUser } from "./auth/admin.js";
import { verifyToken } from "./helper.js";
import multer from "multer";
import { upload, uploadCollection, uploadProfile } from "./handelStorage.js";
const router = express.Router();


router.post("/login", Login); 
router.post(
    "/add-product",
    verifyToken,  
    upload.fields([
      { name: "thumbnail", maxCount: 1 }, 
      { name: "media", maxCount: 10 },     
    ]),
    addProduct
  );
  


  router.post("/add-collection", verifyToken,uploadCollection.single("thumbnail"), addCollection);


  router.post("/add-user", verifyToken, uploadProfile.single('thumbnail'),addUser)
export default router;   
