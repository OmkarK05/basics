const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/events", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  console.log(req.body);
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };

    console.log(posts);
    res.status(200).send(posts[id]);
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    const post = posts[postId];
    post["comments"] ? "" : (post["comments"] = []);
    post.comments.push({ id, content });

    console.log(posts);

    res.status(200).send({ comment: { id, content } });
  }
});

app.listen("4004", () => {
  console.log("Listening on port 4004");
});
