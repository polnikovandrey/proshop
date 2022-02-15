import express, { Router } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const uploadRouter: Router = express.Router();
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback);
    }
});

function checkFileType(file: Express.Multer.File, callback: FileFilterCallback) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return callback(null, true);
    } else {
        callback(new Error("Images only"));
    }
}

uploadRouter.post('/', upload.single('image'), (req, res) => {
    res.send(`\\${req.file.path}`);
});

export default uploadRouter;