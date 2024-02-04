import express from "express";

const app = express();

import todoRoute from "./routes/todoRoute.js";

import config from "./config/config.js";

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/todos", todoRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});
