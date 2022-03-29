video = ""




function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide()
    
}

function preload(){
    video = createVideo("video.mp4");
}

function start(){
    objectDetector = ml5.objectDetect("cocossd",modelLoaded)
    document.getElementById("status").innerHTML = "Status: Objects Detecting"
}

function modelLoaded(){
    console.log("Model Loaded!")
}