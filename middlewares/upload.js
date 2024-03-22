// Імпорт бібліотек
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
// Шлях до файлів
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tempDir = path.join(__dirname, "../tmp");
// Налаштування
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
// Експорт
export const upload = multer({ storage: multerConfig });
