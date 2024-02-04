import fs from "fs/promises";

export const readFile = async (path) => {
  try {
    const temp = await fs.readFile(path, "utf-8");
    const data = JSON.parse(temp);
    return data;
  } catch (error) {
    throw error;
  }
};

export const writeFile = async (path, data) => {
  try {
    const temp = JSON.stringify(data);
    await fs.writeFile(path, temp, "utf-8");
  } catch (error) {
    throw error;
  }
};
