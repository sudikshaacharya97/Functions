var speakBtn, txtFld, speakerMenu, language;
var allVoices, langtags;
var voiceIndex = 0;

function init(){
  speakBtn = qs("#speakBtn");
  txtFld = qs("#txtFld"); 
  speakerMenu = qs("#speakerMenu");
  language = qs("#language");
  langtags = getLanguageTags();
  speakBtn.addEventListener("click",talk,false);
  speakerMenu.addEventListener("change",selectSpeaker,false);
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
  speakerMenu.innerHTML = code;
  speakerMenu.selectedIndex = voiceIndex;
}
//code for when the user selects a speaker
function selectSpeaker(){
  voiceIndex = speakerMenu.selectedIndex;
  var sval = Number(speakerMenu.value);
  var voice = allVoices[sval];
  var langcode = voice.lang.substring(0,2);
  var langcodeobj = searchObjects(langtags,"code",langcode);
  language.innerHTML = langcodeobj[0].name;
}
function talk(){
  var sval = Number(speakerMenu.value);
  var u = new SpeechSynthesisUtterance();
  u.voice = allVoices[sval];
  u.lang = u.voice.lang;
  u.text = txtFld.value;
  u.rate = 0.8;
  speechSynthesis.speak(u);
}
function getLanguageTags(){
  var langs = ["ar-Arabic","cs-Czech","da-Danish","de-German","el-Greek","en-English","eo-Esperanto","es-Spanish","et-Estonian","fi-Finnish","fr-French","he-Hebrew","hi-Hindi","hu-Hungarian","id-Indonesian","it-Italian","ja-Japanese","ko-Korean","la-Latin","lt-Lithuanian","lv-Latvian","nb-Norwegian Bokmal","nl-Dutch","nn-Norwegian Nynorsk","no-Norwegian","pl-Polish","pt-Portuguese","ro-Romanian","ru-Russian","sk-Slovak","sl-Slovenian","sq-Albanian","sr-Serbian","sv-Swedish","th-Thai","tr-Turkish","zh-Chinese"];
  var langobjects = [];
  for (var i=0;i<langs.length;i++){
    var langparts = langs[i].split("-");
    langobjects.push({"code":langparts[0],"name":langparts[1]});
  }
  return langobjects;
}
// Generic utility functions
function searchObjects(array,prop,term,casesensitive = false){
  //searches an array of objects for a given term in a given property
  //returns only those objects that test positive
  var regex = new RegExp(term, casesensitive ? "" : "i");
  var newArrayOfObjects = array.filter(obj => regex.test(obj[prop]));
  return newArrayOfObjects;
}
function qs(selectorText){
  //saves lots of typing for those who eschew Jquery
  return document.querySelector(selectorText);
}
document.addEventListener('DOMContentLoaded', function (e) {
  try {init();} catch (error){
    console.log("Data didn't load", error);}
});

