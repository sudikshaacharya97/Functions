var speakBtn, txtFld, speakerMenu, language;
var allVoices, langtags;
var voiceIndex = 0;

function init(){
  speakBtn = qs("#speakBtn");
  txtFld = qs("#txtFld"); 
  speakerMenu = qs("#speakerMenu");
  language = qs("#language");
//   langtags = getLanguageTags();
  speakBtn.addEventListener("click",talk,false);        
//   speakerMenu.addEventListener("change",selectSpeaker,false);
  if (window.speechSynthesis) {
    if (speechSynthesis.onvoiceschanged !== undefined) {
      //Chrome gets the voices asynchronously so this is needed
      speechSynthesis.onvoiceschanged = setUpVoices;
    }
    setUpVoices(); //for all the other browsers
  }else{
    speakBtn.disabled = true;
    speakerMenu.disabled = true;
    qs("#warning").style.display = "block";
  }
}
function setUpVoices(){
  allVoices = getAllVoices();
  createSpeakerMenu(allVoices);
}
function getAllVoices() {
  var voicesall = speechSynthesis.getVoices();
  var vuris = [];
  var voices = [];
  voicesall.forEach(function(obj,index){
var uri = obj.voiceURI;
    if (!vuris.includes(uri)){
      vuris.push(uri);
      voices.push(obj);
    }
  });
   voices.forEach(function(obj,index){obj.id = index;});
   return voices;
 }
function createSpeakerMenu(voices){
  var code = ``;
  voices.forEach(function(vobj,i){
    code += `<option value=${vobj.id}>`;
    code += `${vobj.name} (${vobj.lang})`;
    code += vobj.voiceURI.includes(".premium") ? ' (premium)' : ``;
    code += `</option>`;
  });
//   speakerMenu.innerHTML = code;
//   speakerMenu.selectedIndex = voiceIndex;
}

function talk(){
//   var sval = Number(speakerMenu.value);
  var u = new SpeechSynthesisUtterance();
//   u.voice = allVoices[sval];
//   u.lang = u.voice.lang;
// ######################## Hard code u.lang###########
u.lang='en-IN';  
console.log(u.lang);
  u.text = txtFld.value;
  u.rate = 0.8;
  speechSynthesis.speak(u);
}

function qs(selectorText){
  //saves lots of typing for those who eschew Jquery
  return document.querySelector(selectorText);
}
document.addEventListener('DOMContentLoaded', function (e) {
  try {init();} catch (error){
    console.log("Data didn't load", error);}
});

