console.log("CLIENT SIDE RUNNING")

if (typeof window !== 'undefined') {
    console.log('You are on the browser')
  } else {
    console.log('You are on the server')
  }

let store = {
    name: 'none',
    apod: 'none',
    rovers: ['curiosity', 'opportunity', 'spirit'],
    rover: 'none',
    camera: 'none'
}

// add our markup to the page
const updateStore = (store, newState) => {
    console.log("Store in UpdateStore:")
    console.log(store)
    console.log("Store in UpdateStore:")
    console.log(store)
    store = Object.assign(store, newState)
    console.log("Store after Assign:")
    console.log(store)
    console.log("Store updated")
    render(root, store)
};

const render = async (root, state) => {
    root.innerHTML = App(state)
    console.log("APP: state")
    console.log(App(state))
    console.log("ROOT")
    console.log(App(root.innerHTML))
}

// Helper function/code to capitalize words as neccessary.
const capitalize = ([first, ...rest], lowerRest = false) =>
first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

const getRoverPhotos = async (store, fn) => {

    const name = document.getElementById('name').value;
    console.log(name)
    const rover = document.getElementById('rover').value;
    console.log(rover)
    const camera = document.getElementById('camera').value;
    console.log(camera)

    const userInfo = new Object();
    userInfo.name = name
    userInfo.rover = rover
    userInfo.camera = camera

    console.log("User Info Object:")
    console.log("Parsing into JSON string...")
    const body = JSON.stringify(userInfo)
    console.log(body)
    console.log(body.length)

    const options = {
      method: "POST",
      headers: {'Content-Type': "application/json"},
      body: body
    };

    console.log("CLIENT SIDE RESPONSE: FETCH IMAGE DATA")
    const response = await fetch('/results', options)
    console.log("Okay? ", response.ok)
    console.log("Unexpected end of input?")
    console.log(response)

    const json = await response.json();
    console.log(json)

    if (response.ok === true) {
        const newState = json
        updateStore(store, newState)
        console.log("Response OK. New Store: ", store)
        return store
    } else {
        throw new Error()
}};

// Render content based on user input chosenRover.
// if chosenRover is defined, run function to create slideshow.
// if chosenRover not defined, redirect user to form

// CREATE CONTENT STARTING HERE:
// Closure starts

const App = (state) => {
    let { store } = state

    // Store no longer exists. Absorbed by state.
    console.log("What is state now?")
    console.log(state)

    // Makes and merges rover and photo info objects for cards.
    // Some images are duplicates, but urls are differet.

    const showRoverPhotos = (state) => {
        const imageURLs = state.gallery.latest_photos.map(photo => photo.img_src)
        const imageObjects = state.gallery.latest_photos.map(photo => photo.img_src = new Image(600,600))
        const imageDates = state.gallery.latest_photos.map(photo => photo.earth_date)
        const cameraNames = state.gallery.latest_photos.map(photo => photo.camera.full_name)
        const roversNames = state.gallery.latest_photos.map(photo => photo.rover.name)
        const roversStatus = state.gallery.latest_photos.map(photo => photo.rover.status)
        const roversLaunchDates = state.gallery.latest_photos.map(photo => photo.rover.launch_date)
        const roversLandDates = state.gallery.latest_photos.map(photo => photo.rover.landing_date)

        const roverPhotoInfo = (imageURLs, imageObjects, imageDates, cameraNames, roversNames, roversStatus, roversLaunchDates, roversLandDates) => imageURLs.map((imageURL, i) => ({imageURL, imageObject: imageObjects[i], imageDate: imageDates[i], cameraName: cameraNames[i], roverName: roversNames[i],
            roverStatus: roversStatus[i], roverLaunchDate: roversLaunchDates[i], roverLandDate: roversLandDates[i]
    }));

    console.log("Results: Rover Photo Info")
    console.log(roverPhotoInfo);

    console.log("showRoverPhotos mapped new arrays")
    photoInfo = roverPhotoInfo(imageURLs, imageObjects, imageDates, cameraNames, roversNames, roversStatus, roversLaunchDates, roversLandDates)
    console.log("roverPhotoInfo: arrays mapped into new objects.")
    const imageMaps = Array.from(photoInfo)
    console.log("Image maps created.")
    console.log(imageMaps)

    // Flattens array values. Easier to work with.
    // Don't forget: Single array of objects

    console.log("roverPhoto Info Returning content for each image in gallery")
    return (imageMaps.map( item =>
    `<div class="container">
    <img src=${item.imageURL} width=600px height=600px alt="Mars Rover Photo Taken ${item.imageDate}"/>
    <br>
    <br>
    <p><span>Rover Name:</span> ${item.roverName}</p>
    <p><span>Rover Status:</span> ${capitalize(item.roverStatus)}</p>
    <p><span>Launch Date:</span> ${item.roverLaunchDate}</p>
    <p><span>Landing Date:</span> ${item.roverLandDate}</p>
    <p><span>Image Date:</span> ${item.imageDate}</p>
    <p><span>Image Date:</span> ${item.cameraName}</p>
    <p></p>
    <br>
    <hr/>
    <br>
    </div>`).slice(0, 50).join(""))
}

// Image maps not defined. Only state.
if (state.gallery.latest_photos[0].rover.name != undefined || null || '' || 'none') {
    console.log("showRoverPhotos called inside html. returns user welcome.")
    const chosenRover = capitalize(state.gallery.latest_photos[0].rover.name)
    return (`
    <header>
    <h2 class="main-title">Welcome to the ${chosenRover} Rover's Gallery</h2>
    </header>
    <div class="main">
    <hr />
    <p><h4>Greetings, Earthling! Welcome to the Red Planet.</p>
    <br>
    <br>
    <div>${showRoverPhotos(state)}
    </div>
    <br></br>
    <hr />
    </div>
    <footer>
    <footer>
    `)
};

// APP Closure ends
// END OF APP FUNCTION
console.log("Closure ends here.")
};


