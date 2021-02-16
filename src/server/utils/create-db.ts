import * as fs from "fs/promises";
import * as path from "path";

export const createDB = async () => {
  try {
    await fs.writeFile(path.join(__dirname, "../db/database"), "");
    return true;
  } catch (e) {
    throw new Error(e);
  }
};
