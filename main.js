video = "";
status = "";
objects = [];

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Estado: Objetos detectados.";
            document.getElementById("number_of_objects").innerHTML = "Número de Objetos detectados: "+ objects.length;

            fill("#DF0101");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%", objects.x+15, objects.y+15);
            noFill();
            stroke("#DF0101");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    } else {
    console.log(results);
    objects = results;

    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estado: Detectando...";
}

function modelLoaded(){
    console.log("Modelo cargado");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}