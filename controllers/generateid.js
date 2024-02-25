let express = require("express");
const { ytid } = require("ytid");
let app = express();
app.use(express.json());

let urlModel = require("../model/urlmodel");
app.use(express.json());
async function handlenewid(req, res) {
  let content = req.body;
  console.log(req.body);

  if (!content) {
    res.status(400).json({ error: "invalid url" });
  } else {
    let uniqid1 = ytid();
    await urlModel.create({
      shortlink: uniqid1,
      redirectlink: content.url,
    });
    let data = await urlModel.find({});
    res.status(201).redirect("/test");
  }
}

module.exports = handlenewid;
