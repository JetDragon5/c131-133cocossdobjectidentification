const elementStatus = document.getElementById("status");
var img = "";
var statuss = false;
var objects = [];

function preload(){
    img = loadImage("random.png");
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();

    objectDetectorr = ml5.objectDetector("cocossd", modelLoaded);
    elementStatus.innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    statuss = true;
    objectDetectorr.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    } else
        console.log(results);
        objects = results;
}

function draw(){
    canvas.center();
    image(img, 0, 0, 650, 450);

    if(statuss){
        for(i = 0; i < objects.length; i++){
            elementStatus.innerHTML = "Status : Object(s) Detected"

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill();
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
    //fill("#000000");text("dog", 250, 55);noFill();stroke("#ff0000");rect(250, 60, 235, 380);
}