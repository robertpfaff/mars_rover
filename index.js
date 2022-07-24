
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors')
const fetch = require('node-fetch');
const app = express();

app.use('/', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors("*"));

app.post('/userinput', async (request, response) => {

  const rover = request.body.rover

  try {
    const gallery = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=DH46IQlx0gMyXPmLAgkxXDSPo2OrbIjPs8OJLj6L`)
    .then(response => response.json()) // send json to client
    .then(gallery => response.send({gallery})) // send gallery to browser (so I can see it)
  } catch (err) {
    console.log(`ERROR: ${response.status}`, err);
  }
  return response.json

});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port${port}`);


});