status = "";
objects = [];

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
}

function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML = "Status: Objects Detecting"
    input_name = document.getElementById("input").value ;
    object_name = input_name.toLowerCase();
}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        r = random(225)
        g = random(225)
        b = random(225)
        for(i=0;i<objects.length;i++){
            fill(r,g,b);
            stroke(r,g,b);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            percentage = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x+15,objects[i].y+15);
            if(objects[i].label == object_name){
                document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: "+ objects.length;
                document.getElementById("number_of_objects").innerHTML = object_name + " found!" ;
            }
            else{
                document.getElementById("number_of_objects").innerHTML = object_name + " not found!" ;
            }
        }
    }
}

function modelLoaded(){
    console.log("Model loaded!");
    status = true;
    objectDetector.detect(video,gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results ;
    }
}