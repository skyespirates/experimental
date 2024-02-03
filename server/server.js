import express from "express";

const app = express();

import todoRoute from "./routes/todoRoute.js";

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/todos", todoRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
