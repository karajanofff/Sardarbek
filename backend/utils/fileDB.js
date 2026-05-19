import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "..", "data");

export const dataPath = (fileName) => path.join(dataDir, fileName);

export async function readJSON(fileName) {
  const raw = await fs.readFile(dataPath(fileName), "utf-8");
  return JSON.parse(raw || "[]");
}

export async function writeJSON(fileName, data) {
  await fs.writeFile(dataPath(fileName), JSON.stringify(data, null, 2), "utf-8");
  return data;
}

export function nextId(items) {
  const max = items.reduce((acc, item) => Math.max(acc, Number(item.id) || 0), 0);
  return String(max + 1);
}
