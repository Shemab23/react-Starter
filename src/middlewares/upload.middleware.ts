import multer from "multer";
import { appConfig } from "../config/app.config.js";
import { AppError } from "./error.middleware.js";

/**
 * Files are held in memory and streamed to Cloudinary from the controller/
 * service layer — nothing is written to local disk.
 *
 * Usage:  router.post("/", upload.single("image"), productController.create);
 */
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: appConfig.upload.maxFileSizeBytes },
  fileFilter(req, file, cb) {
    if (!appConfig.upload.allowedMimeTypes.includes(file.mimetype)) {
      cb(new AppError(`Unsupported file type: ${file.mimetype}`, 415));
      return;
    }
    cb(null, true);
  },
});
