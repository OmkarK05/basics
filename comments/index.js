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

app.post("/posts/:id/comment", (req, res) => {
  let id = req.params.id;
  let commentId = randomBytes(4).toString("hex");
  comments[id] = comments[id] || [];
  console.log(comments[id]);
  comments[id].push({ id: commentId, content: req["body"]["content"] });

  axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  console.log(comments);

  res
    .status(201)
    .send({ comment: { id: commentId, content: req["body"]["content"] } });
});

app.post("/events", (req, res) => {
  console.log("Comment Event", req.body);
});

app.listen(4002, () => {
  console.log("listening at port 4001");
});
