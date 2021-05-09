const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json);

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "commentCreated") {
    data.status = data.content().includes("orange") ? "rejected" : "approved";

    let response = await axios.post("http://localhost:4004/events", {
      type: "commentModerated",
      data,
    });
    if (response) {
      console.log(response);
    }
  }
});

app.listen(4006, () => {
  console.log("listening at 4005");
});
