//global vars
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

//DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photoButton');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');


//get media stream
navigator.mediaDevices.getUserMedia({video: true, audio:false})
                    .then(function(stream){
                        //link to the video source
                        video.srcObject = stream;
                        //play the video
                        video.play();
                    })
                    .catch(function(err){
                        console.log(`Error: ${err}`);
                    });

// downloadable image




//play when ready
video.addEventListener('canplay', function(e){
    if(!streaming){
        //set video canvas height
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        
        streaming = true;
    }
}, false);

//taking photo
photoButton.addEventListener('click', function(e){
    takePicture();

    e.preventDefault();
}, false);

function takePicture(){

    //create canvas
    const context = canvas.getContext('2d');
    if(width && height){
        //set canvas props
        canvas.width = width;
        canvas.height = height;
        
        //create img element
        const img = document.createElement('img');

        //draw an image of the video on the canvas
        context.drawImage(video, 0, 0, width, height);
        //create image from the canvas
        const imgUrl = canvas.toDataURL('image/png');

        //set img source
        img.setAttribute('src', imgUrl);

        //set image filter
        img.style.filter = filter;

        //add img to photos
        photos.appendChild(img);

        
        try {
            localStorage.setItem(img, imgUrl);
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }

    }
}



photoFilter.addEventListener('change', function(e){
    //set filter to chosen option
    filter = e.target.value;
    //set filter to video
    video.style.filter = filter;

    canvas = filter;

    e.preventDefault();
});

//clear event
clearButton.addEventListener('click', function(e){
    //clear photos
    photos.innerHTML = '';
    //change filter back to normal
    filter = 'none';
    // ^^^ put the filter to normal
    video.style.filter = filter;
    //reset select list
    photoFilter.selectedIndex = 0;


    // e.preventDefault();
});



