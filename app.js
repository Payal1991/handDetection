const modelParams = {
    flipHorizontal: false,   // flip e.g. for video
    imageScaleFactor: 0.7,  //reduce input image size for gains in speed
    iouThreshold: 0.5,  // maximum number of boxes to detect
    scoreThreshould: 0.9   //confidance threshold for predictions
}

// accessing the webcam
navigator.getUserMedia = navigator.getUserMedia || navigator.msGetUserMedia || navigator.wrbkitGetUserMedia || navigator.mozGetUserMedia;

// selecting everything from the html
const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");

// working with 2d contexxt
const context = canvas.getContext("2d");
let model;

handTrack.startVideo(video).then(status =>{
    if(status){
        navigator.getUserMedia({video: { }}, stream =>{
            video.scrObject = stream;
            setInterval(runDetection, 100);
        }, err=>console.log(err));
    }
})

function runDetection(){
    model.detect(video).then(predictions =>{
        // console.log(predictions[0]['label'] == 'face');
        console.log(predictions);
        model.renderPredictions(predictions, canvas, context, video);
        if(predictions[1]['label'] != 'face'){
            audio.play();
        }
    })
}

handTrack.load(modelParams).then(lmodel => {
        model = lmodel;
});
