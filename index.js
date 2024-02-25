const express = require("express");
const server = express();
const mongoose = require("mongoose");
const path = require("path");

let ejs = require("ejs");

mongoose
  .connect("mongodb://127.0.0.1:27017/url-short")
  .then(console.log("mongo cnnected"));
let urlModel = require("../1)url shortner/model/urlmodel");

const urlRouter = require("./routes/urlRoute");
server.set("view engine", "ejs");
server.set("views", path.resolve("./views"));

server.use(express.json());

server.use(express.urlencoded({ extended: false }));

server.get("/", async (req, res) => {
  const data = await urlModel.find({});

  res.render("home", { data: data });
});

server.use("/url", urlRouter);
server.get("/url/:shortid", async (req, res) => {
  let id = req.params.shortid;
  const data = await urlModel.findOneAndUpdate(
    { shortlink: id },
    {
      $push: {
        history: { time: Date.now() },
      },
    }
  );

  if (data) {
    res.redirect(data.redirectlink);
  } else {
    res.status(404).send("nops");
  }
});

server.get("/analytics/:shortid", async (req, res) => {
  let id = req.params.shortid;
  const data = await urlModel.findOne({ shortlink: id });

  res.json({ clicks: data.history.length, analytics: data.history });
});

server.listen(8002, () => {
  console.log("Server is running on port 8002");
});
