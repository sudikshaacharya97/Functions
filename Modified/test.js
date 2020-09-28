var clickcount =0;
function clickCounter() {

if(clickcount==0){
 startButton(event);
 clickcount=1;
}
else {
 StopButton(event);
 clickcount=0;
}
}

var final_transcript = '';
var interim_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
//   start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
//   var recognition1= new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = function(event) {
  //var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        final_transcript = capitalize(final_transcript);
        messageInput.value = linebreak(final_transcript);
      } else {
        interim_transcript += event.results[i][0].transcript;
        messageInput.value = interim_transcript;
      }
    }
  };
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  //   console.log(recognition.lang);
  //   console.log(recognition.lang);
  recognition.lang = 'en-AU';
  console.log(recognition.lang);
//   console.log(recognition.lang);s
  recognition.start();
  ignore_onend = false;
  document.getElementById("messageInput").value=''
  start_img.src = 'mic.jpeg';
}

function StopButton(event){
    recognition.stop();
    console.log("Recording is stopped");
    }
