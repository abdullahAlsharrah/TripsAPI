const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();

app.use(bodyParser.json());

app.use(cors());
