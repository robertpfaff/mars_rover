const express = require('express');
const path = require('path');
const cors = require('cors')
const _ = require('underscore')
const fetch = require('node-fetch');
const app = express();

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.json( { limit: '1mg' }));

app.use(cors({ origin: '*' }));

// Request is what getRoverPhotos sends to server
// Response is (we hope) image URLs from NASA

app.post('/results', async (request, response) => {

  const rover = request.body.rover
  console.log("Rover: ", rover)

  try {
    await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=DH46IQlx0gMyXPmLAgkxXDSPo2OrbIjPs8OJLj6L`)
    .then(response => response.json()) // converts to JSON as needed
    .then(data => response.send({data})) // sends it back to the client as data
  } catch (err) {
    console.log(`RESPONSE STATUS: ${response.status}`, err);
  }
  return response.json()

});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

});
