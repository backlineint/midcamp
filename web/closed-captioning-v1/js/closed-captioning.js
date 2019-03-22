// Set vars.
var cc = document.getElementById('cc-text');
var button = document.getElementById('cc-button');
var mobileHeight = $(window).height() - (75);


var recognizing = false;

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
  
recognition.onstart = function() {
  recognizing = true;
};

recognition.onerror = function(event) {};
recognition.onend = function() {
  recognizing = false;
};

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if(event.results[i][0].confidence > 0.4) {
      cc.innerHTML = capitalize(event.results[i][0].transcript);
    }
  }
};

function capitalize(s) {
  var first_char = /\S/;
 return s.replace(first_char, function(m) { 
    return m.toUpperCase(); 
  }); 
}

function toggleSpeechRecognition(event) {
  if(recognizing) {
    recognition.stop();
    cc.style.display = "none";
    button.style.display = "inline-block";
    $('body').toggleClass('cc-on');
    return;
  } else {
    cc.style.display = "inline-block";
    button.style.display = "none";
    $('body').toggleClass('cc-on');
    recognition.start();
  }
}
