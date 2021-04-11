const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/post", async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  let response = await axios.post("http://localhost:4003/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  console.log(response);

  if (response.status === 200) {
    console.log(response);
    res.status(200).send({ id, title });
  }
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body);
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
