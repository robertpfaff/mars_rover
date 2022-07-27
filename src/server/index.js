const express = require('express');
const path = require('path');
const cors = require('cors')
const fetch = require('node-fetch');
const app = express();

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.json( { limit: '1mg' }));

app.use(cors({ origin: '*' }));

// request is what getRoverPhotos sends to server
// response are (we hope) image URLs from NASA

app.post('/results', async (request, response) => {

  console.log("SERVER SIDE: Rover");
  const rover = request.body.rover
  console.log(rover)

  try {
    const gallery = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=DH46IQlx0gMyXPmLAgkxXDSPo2OrbIjPs8OJLj6L`)
    .then(response => response.json()) // send json back to client
    .then(gallery => response.send({gallery})) // send gallery to browser (so I can see it)
  } catch (err) {
    console.log(`RESPONSE STATUS: ${response.status}`, err);
  }
  console.log("GALLERY:")
  console.log(response.json())
  return response.json()

});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

});
