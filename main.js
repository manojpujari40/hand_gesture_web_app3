Webcam.set({
    width:350,
    height:300,
    image_format: "png",
    png_quality:90
});
predection = ""
camera = document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/813h_5Xqf/model.json", model_loaded);
function model_loaded(){
    console.log("model Loaded");
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function speak(){
    var syth = window.speechSynthesis;
    speak_data = "Predection is" + predection;
    utterthis =  new SpeechSynthesisUtterance(speak_data);
    syth.speak(utterthis);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("hand_emotion_name").innerHTML = results[0].label;
        predection = results[0].label;
        speak();
        if (results[0].label == "amazing"){
            document.getElementById("hand_emoji").innerHTML = "&#128076;"
        }
        if (results[0].label == "victory"){
            document.getElementById("hand_emoji").innerHTML = "&#9996;"            
        }
        if (results[0].label == "best"){
            document.getElementById("hand_emoji").innerHTML = "&#128077;"
        }
    }
}