import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  FILE_PATH: process.env.FILE_PATH,
};
