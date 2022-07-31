console.log("CLIENT SIDE RUNNING")

let store = {
    name: 'NONE',
    rovers: ['curiosity', 'opportunity', 'spirit'],
    rover: 'NONE',
    camera: 'NONE'
}

// Add our markup to the page

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    console.log("See STORE below. Main memory updated.")
    console.log(store)
    render(root, store)
};

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// Helper function/code to capitalize words as neccessary.

const capitalize = ([first, ...rest], lowerRest = false) =>
first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

// Function invoked by form button (see index.html)
// Fetches, filters NASA data.
// Updates store.

const getRoverPhotos = async (store, fn) => {

    const name = document.getElementById('name').value.trim();
    const rover = document.getElementById('rover').value.trim();
    const camera = document.getElementById('camera').value.trim();

    const userInput = new Object();
    userInput.name = name;
    userInput.rover = rover;
    userInput.camera = camera;

    const body = JSON.stringify(userInput);

    console.log("Request Body after Stringify:")
    console.log(body)

    const options = {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: body
      };

      console.log("Options Body: BEFORE FETCH")
      console.log(options.body)

      console.log("SERVER SIDE RESPONSE: FETCH IMAGE DATA")
      const response = await fetch('/results', options)
      console.log(response)
      console.log("Okay? ", response.ok)

      let results = await response.json();
      console.log("Results: Latest Photos JSON object")
      console.log(results)

      // filter results with ternary operators if camera angle chosen
      // clear newState = to empty object again

      // filter gallery by camera angle if one chosen.
      // if not chosen in userInput.camera, temp = gallery

      let gallery = [];

      userInput.camera == 'NONE' ? gallery = results.data.latest_photos : gallery = results.data.latest_photos.filter(photo => photo.camera.name.trim() == userInput.camera.trim())

      console.log("What is gallery?")
      console.log(gallery)
      console.log("Is gallery array?")
      console.log(Array.isArray(gallery))

      // Gather values in newState object.

      const newState = {
        name : name,
        rover : rover,
        camera : camera,
        gallery : gallery
      }

      console.log("What is newState object?")
      console.log(newState)

      // camera angle filter often yields no results.
      // if no images in newstate.gallery, send user back to form
      // with message to try all camera angles.

      let galleryLength = newState.gallery

      console.log("NewState.gallery Length:")
      console.log(galleryLength.length)

      // No images in the gallery? if true, go back to form.

      if (galleryLength.length == 0 || undefined) {
        return (document.write(`<div> 
        <p>Dear earthling ${newState.name}, <br>.
        Sorry. No images match those parameters. This shit happens.<br>
        Please try All Camera Angles to increase the scope. <br>
        <br> Form resets in ten seconds...</p></div>
        <script>
        ${setTimeout(function() {
        window.location.href = 'index.html'}, 12000)};
        </script></div>`))
    } else {
        updateStore(store, newState)
        return newState
}

};

// CREATE CONTENT STARTING HERE:
// Closure starts

const App = (state) => {
    let { store } = state

    // Store = state. No longer exists.
    // Absorbed by state inside App closure.

    console.log("What is state/store now?")
    console.log(state)

    // Makes and merges rover and photo info objects for cards.
    // Called in html for gallery display.
    // Some images are duplicates, but urls are differet.

    const showRoverPhotos = (state) => {
        const imageURLs = state.gallery.map(photo => photo.img_src)
        const imageObjects = state.gallery.map(photo => photo.img_src = new Image(600,600))
        const imageDates = state.gallery.map(photo => photo.earth_date)
        const cameraNames = state.gallery.map(photo => photo.camera.full_name)
        const roversNames = state.gallery.map(photo => photo.rover.name)
        const roversStatus = state.gallery.map(photo => photo.rover.status)
        const roversLaunchDates = state.gallery.map(photo => photo.rover.launch_date)
        const roversLandDates = state.gallery.map(photo => photo.rover.landing_date)

        const roverPhotoInfo = (imageURLs, imageObjects, imageDates, cameraNames, roversNames, roversStatus, roversLaunchDates, roversLandDates) => imageURLs.map((imageURL, i) => ({imageURL, imageObject: imageObjects[i], imageDate: imageDates[i], cameraName: cameraNames[i], roverName: roversNames[i],
            roverStatus: roversStatus[i], roverLaunchDate: roversLaunchDates[i], roverLandDate: roversLandDates[i]
        }));

    photoInfo = roverPhotoInfo(imageURLs, imageObjects, imageDates, cameraNames, roversNames, roversStatus, roversLaunchDates, roversLandDates)
    const imageMaps = Array.from(photoInfo)
    console.log(imageMaps)

    return (imageMaps.map( item =>
    `<div class="container">
    <img src=${item.imageURL} width=600px height=600px alt="Mars Rover Photo Taken ${item.imageDate}"/>
    <br>
    <br>
    <p><span>Rover Name:</span> ${capitalize(item.roverName)}</p>
    <p><span>Rover Status:</span> ${capitalize(item.roverStatus)}</p>
    <p><span>Launch Date:</span> ${item.roverLaunchDate}</p>
    <p><span>Landing Date:</span> ${item.roverLandDate}</p>
    <p><span>Image Taken:</span> ${item.imageDate}</p>
    <p><span>Camera Name:</span> ${item.cameraName}</p>
    <p></p>
    <br>
    <hr/>
    <br>
    </div>`).slice(0, 50).join(""))
}

// Greetings for gallery.
if (state.rover != undefined || null || '' || 'none') {
    console.log("Show Rover Photos function called inside html.")
    const chosenRover = capitalize(state.rover)
    return (`
    <header>
    <h2 class="main-title">Welcome to the ${chosenRover} Rover's Gallery</h2>
    </header>
    <div class="main">
    <hr />
    <p><h4>Greetings, Earthling ${state.name}!</p>
    <p>Welcome to the Red Planet.</p>
    <br>
    <br>
    <div>${showRoverPhotos(state)}
    </div>
    <br></br>
    <hr />
    </div>
    <footer>
    </footer>
    `)
} else {
    return (document.write(`<div font-family='Montserrat' font-size='16px'>
    <p>Dear earthling ${newState.name}, <br>
    Sorry. No images match those parameters. This shit happens.<br>
    Please try All Camera Angles to increase the scope. <br>
    <br> Form resets in ten seconds...</p></div>
    <script>
    ${setTimeout(function() {
    window.location.href = 'index.html'}, 12000)};
    </script></div>`))
}

// App closure ends.
};




