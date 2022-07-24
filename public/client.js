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
    store = Object.assign(store, newState)
    console.log("Store updated")
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// Helper function/code to capitalize words as neccessary.
const capitalize = ([first, ...rest], lowerRest = false) =>
first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : est.join(''));

// Render content based on user input chosenRover.
// if chosenRover is defined, run function to create slideshow.
// if chosenRover not defined, redirect user to form

// CREATE CONTENT STARTING HERE:
// Closure starts

const App = (state) => {
    let { store } = state
    console.log("What is APP now?")
    console.log(App)

    console.log("What is state now?")
    console.log(App)

    console.log("Does store exist inside App now?")
    console.log(store)

    // Makes and merges rover and photo info objects for cards.
    // Some images are duplicates, but urls are differet.

    const showRoverPhotos = (state) => {
        const imageURLs = state.latest_photos.map(photo => photo.img_src)
        const imageObjects = state.latest_photos.map(photo => photo.img_src = new Image(600,600))
        const imageDates = state.latest_photos.map(photo => photo.earth_date)
        const cameraNames = state.latest_photos.map(photo => photo.camera.full_name)
        const roversNames = state.latest_photos.map(photo => photo.rover.name)
        const roversStatus = state.latest_photos.map(photo => photo.rover.status)
        const roversLaunchDates = state.latest_photos.map(photo => photo.rover.launch_date)
        const roversLandDates = state.latest_photos.map(photo => photo.rover.landing_date)

        const roverPhotoInfo = (imageURLs, imageObjects, imageDates, cameraNames, roversNames, roversStatus, roversLaunchDates, roversLandDates) => imageURLs.map((imageURL, i) => ({imageURL, imageObject: imageObjects[i], imageDate: imageDates[i], cameraName: cameraNames[i], roverName: roversNames[i],
            roverStatus: roversStatus[i], roverLaunchDate: roversLaunchDates[i], roverLandDate: roversLandDates[i]
    }));

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
    <p><span>Rover Status:</span> ${item.roverStatus}</p>
    <p><span>Launch Date:</span> ${item.roverLaunchDate}</p>
    <p><span>Landing Date:</span> ${item.roverLandDate}</p>
    <p><span>Image Date:</span> ${item.imageDate}</p>
    <p></p>
    <br>
    <hr/>
    <br>
    </div>`).slice(0, 50).join(""))
}

console.log("showRoverPhotos called inside html. returns user welcome.")

if (state.rover != undefined || null || '' || 'none') {
    const rover = capitalize(rover)
    return (`
    <header>
    <h2 class="main-title">Welcome to the ${rover} Rover's Gallery</h2>
    </header>
    <div class="main">
    <hr />
    <p><h4>Greetings, Earthling! Mission Completed.</p>
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

// Closure ends
// END OF APP FUNCTION

console.log("Closure ends here.")

};

// Single async higher-order/callback function
// Retrieves image data and update store/new state
// getRoverPhotos is Higher Order function.
// RoverPhotos as callback function.

const getRoverPhotos = async (state, fn) => {

    console.log("CIENT SIDE API RUNNING.")

    const response = await fetch("http://localhost:3000/userinput", {
        method: "POST",
        body: body,
        headers: {'Content-Type': 'application/JSON' }
});

const jsonImageData = await response.json()
.then(jsonImageData => console.log(jsonImageData))

const ImageData = jsonImageData.gallery.latest_photos.map(photo => {
    return photo.img_src;

});

    const newState = jsonImageData.gallery
    updateStore(store, newState)
    return ImageData
}

getRoverPhotos(store, updateStore)

