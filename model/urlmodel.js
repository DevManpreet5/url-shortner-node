let mangoose = require("mongoose");
let express = require("express");
let app = express();
app.use(express.json());
const urlschema = new mangoose.Schema(
  {
    shortlink: {
      type: String,
      required: true,
      unique: true,
    },
    redirectlink: {
      type: String,
    },
    history: [{ time: Number }],
  },
  { timestamps: true }
);

const url = mangoose.model("url", urlschema);

module.exports = url;
