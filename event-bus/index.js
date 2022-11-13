const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

let app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const event = req.body;

  // axios.post("http://localhost:4000/events", event);
  // axios.post("http://localhost:4001/events", event);
  let response = await axios.post('http://localhost:4004/events', event);
  console.log(response);
  if (response.status === 200) {
    res.send({ status: 'OKkk' });
  }
});

app.listen('4003', () => {
  console.log('Running on port 4005');
});
