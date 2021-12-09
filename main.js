

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera")

function take_Snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>"
    });
}
console.log("ml5 version-",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/PI1_E4_cl/model.json",modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");

}

function Check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);

    
}
 
function gotResult(error,results){
    if(error){
        consolee.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;

        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        
        speak();

        if(results[0].label=="happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;"
            document.body.style.backgroundColor = "pink";
        }

        if(results[0].label=="sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;"
            document.body.style.backgroundColor = "black";
        }

        if(results[0].label=="angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545;"
            document.body.style.backgroundColor = "pink";
        }

        if(results[1].label=="happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;"
            document.getElementById("quote").innerHTML = "Happiness is not the absence of problems, it’s the ability to deal with them";
            quote = "Happiness is not the absence of problems, it’s the ability to deal with them";            
        }

        if(results[1].label=="sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;"
            document.getElementById("quote").innerHTML = "Sadness flies away on the wings of time.";
            quote = "Sadness flies away on the wings of time.";
        }

        if(results[1].label=="angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;"
            document.getElementById("quote").innerHTML = "Keep your temper. A decision made in anger is never sound.";
            quote = "Keep your temper. A decision made in anger is never sound.";
        }
       
    }
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1 = "the first prediction is "+prediction_1;
    speak_data2 = "the second prediction is "+prediction_2;
    speak_data3 = "motivation quote "+quote;

    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2 + speak_data3);
    synth.speak(utterThis);
}
