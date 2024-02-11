const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", (req, res) => {
  const { image } = req.files;
  // reject upload for non image file
  if (!/^image/.test(image.mimetype)) {
    return res.sendStatus(400);
  }

  image.mv(__dirname + "/upload/" + image.name);

  res.sendStatus(200);
});

app.get("/download", (req, res) => {
  res.download(__dirname + "/upload/" + "images (9).jpeg", (err) => {
    if (err) {
      throw err;
    }
  });
});

app.listen(3000, () => {
  console.log(`listening on port ${3000}`);
});
