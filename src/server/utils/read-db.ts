import * as fs from "fs/promises";
import * as path from "path";

export const readDB = async () => {
  try {
    const res = await fs.readFile(path.join(__dirname, "../db/database"));
    const database = res.toString();
    return database;
  } catch (e) {
    throw new Error(e);
  }
};
