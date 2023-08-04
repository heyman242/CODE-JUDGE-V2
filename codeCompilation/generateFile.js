import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const codesPath = path.join(__dirname, "processingFile");

const generateFile = (language, code) => {
  const newId = uuidv4();
  const fileName = `${newId}.${language}`;
  const filepath = path.join(codesPath, fileName);
  fs.writeFileSync(filepath, code);
  return filepath;
};

export default generateFile;
