import * as fs from "fs/promises";
import * as path from "path";

export const readDB = async (content: string) => {
  try {
    await fs.writeFile(path.join(__dirname, "../../db/database"), content);
    return true;
  } catch (e) {
    throw new Error(e);
  }
};
