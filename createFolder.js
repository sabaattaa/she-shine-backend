import fs from "fs";
const productImgs = "./uploads/productImgs";
const collectinImgs = "./uploads/collectinImgs";
const profileImgs = "./uploads/profileImgs";


export const createUploadFolder = () => {

    if (!fs.existsSync(productImgs)) {
        fs.mkdirSync(productImgs);
    }

    if (!fs.existsSync(collectinImgs)) {
        fs.mkdirSync(collectinImgs);
    } if (!fs.existsSync(profileImgs)) {
        fs.mkdirSync(profileImgs);
    }
}