const express = require("express");
const fileUpload = require("express-fileupload");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");

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
  const user = {
    firstName: "skyes",
    lastName: "crawford",
    isActive: false,
  };

  res.render("pages/index", { user });
});

app.get("/list", async (req, res) => {
  try {
    const { data: list } = await axios(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );

    res.render("pages/list", { list: list });
  } catch (error) {
    throw new Error(error.message);
  }
});

app.post("/upload", (req, res) => {
  const { image } = req.files;
  // reject upload for non image file
  if (!/^image/.test(image.mimetype)) {
    return res.sendStatus(400);
  }

  image.mv(__dirname + "/upload/" + image.name);

  res.status(200).redirect("/");
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
