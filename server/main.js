"use strict";

const express = require("express"),
  app = express(),
  cors = require("cors");

app.use(cors());
app.use("/", express.static("public"));
app.use(express.static("public", { index: false }));

app.listen(8080, () => console.log("APP STARTED"));
