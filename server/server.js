const express = require("express");
const fileUpload = require("express-fileupload");
const axios = require("axios");
const mongoose = require("mongoose");
const morgan = require("morgan");

const Image = require("./models/Image");

const app = express();

app.set("view engine", "ejs");

// middleware
app.use(morgan("tiny"));
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/list", async (req, res) => {
  try {
    const collections = await Image.find({});
    const images = collections.map((image) => {
      return {
        ...image,
        data: "data:image/png;base64," + image.data.toString("base64"),
      };
    });
    const { name, data } = await Image.findById("65c97c246f02a20ec10a31eb");
    const img = {
      name,
      data: "data:image/png;base64," + data.toString("base64"),
    };

    res.render("pages/list", { images: images });
  } catch (error) {
    throw new Error(error.message);
  }
});

app.post("/upload", async (req, res) => {
  try {
    // if there is no file sended, just redirect to the same page
    if (!req.files) {
      res.redirect("/");
      return;
    }
    const { image } = req.files;

    // reject upload for non image file
    if (!/^image/.test(image.mimetype)) {
      return res.sendStatus(400);
    }

    // store image to folder /upload
    // image.mv(__dirname + "/upload/" + image.name);

    await Image.create({
      name: image.name,
      data: image.data,
    });

    res.status(200).redirect("/");
  } catch (error) {
    throw new Error(error.message);
  }
});

app.get("/download", (req, res) => {
  res.download(__dirname + "/upload/" + "images (9).jpeg", (err) => {
    if (err) {
      throw err;
    }
  });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("connected to database"))
  .catch((error) => {
    throw error;
  });

app.listen(3000, () => {
  console.log(`listening on port ${3000}`);
});
