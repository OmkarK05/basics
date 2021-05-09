const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { url } = require("inspector");
const axios = require("axios");

let app = express();
app.use(bodyParser.json());
app.use(cors());

let comments = {};

app.get("/comments", (req, res) => {
  res.status(201).send(comments);
});

app.post("/posts/:id/comment", async (req, res) => {
  let id = req.params.id;

  let commentId = randomBytes(4).toString("hex");
  comments[id] = comments[id] || [];

  let content = req["body"]["content"];
  let status = "pending";
  comments[id].push({ id: commentId, content, status });

  let response = await axios.post("http://localhost:4003/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: id,
      status,
    },
  });

  console.log(response);

  if (response.status === 200) {
    res.status(200).send({
      comment: { id: commentId, content },
      postId: id,
    });
  } else {
    res.status(400).send("Error");
  }
});

app.post("/events", (req, res) => {
  console.log("Comment Event", req.body);
});

app.listen(4002, () => {
  console.log("listening at port 4002");
});
