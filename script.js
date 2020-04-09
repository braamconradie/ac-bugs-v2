// struggled with cloud mqtt so on 2103 discovered shiftr so signed up and works PURRRRFECTLY bram.subscriptions and normal ilanga. EVEN QUICKER than cloudmqtt

let bot = new RiveScript();
client = new Paho.MQTT.Client("broker.shiftr.io", Number(443),"web_" + parseInt(Math.random() * 100));
// client = new Paho.MQTT.Client("m14.cloudmqtt.com", 13337,"web_" + parseInt(Math.random() * 100));
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
let bubblesize = 50;
let videoflag = 0;

var synth = window.speechSynthesis;
var voices = speechSynthesis.getVoices();
var talkToMe = new SpeechSynthesisUtterance("");
var pitch = document.getElementById("pitch");
var rate = document.getElementById("rate");
var volume = document.getElementById("volume");
var vx = document.getElementById("voiceSelect");
var voicescount = 0;
var humidflag;
// var options = {
//     useSSL: true,
//     userName: "yyqzwwpb",
//     password: "UHDKx2H5Jmp_",
//     onSuccess:onConnect,
//     onFailure:doFail
//   }

var options = {
    onSuccess: onConnect,
    userName: "braamshiftr",
    password: "braamshiftrwagwoord",
    useSSL: true,
    onFailure:doFail
  }

client.connect(options);
  
let xoff = 0.0;




const message_container = document.querySelector('.messages');
const form = document.querySelector('form');
const input_box = document.querySelector('input');

function preload() {
  //vid = createVideo("https://cdn.glitch.com/a69fa2b3-1e85-49bf-9139-6e685f1a3776%2F10secShia.mp4");  
  vid = createVideo("https://www.youtube.com/watch?v=Z9TCn-SBNOI"); 
  

  vid.hide();  
 // vid.onended()= console.log('ended';)};  
}


function setup()
	{
    
    console.log('alive');
  let canvas = createCanvas(windowWidth-440, windowHeight-20);
   //canvas.parent('sketch-holder');
   canvas.position(420, 10);
  let txt = createDiv('This is an HTMLggggggggggggg string!');
  // ellipse(600, height/2, 100, 100);
  // ellipse(width/4, height/2, 50, 50);
  txt.position(500, 500);
    myRec.start(); // start engine
		myRec.onResult = parseResult; // recognition callback
    myRec.onEnd = endListen;
    talkToMe.addEventListener('end', function(event) { 
      console.log('Utterance has finished being spoken after ' + event.elapsedTime + ' milliseconds.');
      myRec.start();
      console.log('rec started');
    });
  }

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
	myRec.continuous = false; // do continuous recognition
	myRec.interimResults = false; // allow partial recognition (faster, less accurate)

const brains = [
  'brain.rive'
  //'https://gist.githubusercontent.com/awesammcoder/91e0f6c527bfdc03b8815289ca4af150/raw/6410ce00b7e1ea0dbd28be03b6eaab64252a841d/brain.rive'
];

bot.loadFile(brains).then(botReady).catch(botNotReady);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  selfReply(input_box.value);
  input_box.value = '';
});

function shiadone(){
  console.log('vid ended');
  videoflag=0;
}

function draw() {
  background(620, 180, 200);
  if (videoflag==1){
      image(vid, 0, 0, windowWidth-440, windowHeight-20); // draw the   video   frame to canvas
      vid.speed(1);    
  }

  xoff = xoff + 0.01;
  let n = noise(xoff) * bubblesize;
  //ellipse(600, 300, random(bubblesize*1.1,bubblesize*.9));
  ellipse(600, 300, n);
  ellipse(width/4, height/2, random(40,50), random(50,60));
}

function endListen() {
  console.log('stopped listening');
 
}

function endSpeak() {
  console.log('stopped talking');

}

  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    //text("MQTT connected", 20, 40);
    bot.sortReplies();
    botReply('MQTT connected');
    // synth.speak(talkToMe);
    client.subscribe("awesomebot");
    message = new Paho.MQTT.Message("Hello CloudMQTT man this is wicked");
    message.destinationName = "makerhamilton";
    client.send(message);
  }

  function doFail(e){
    console.log(e);
  }


function botReply(message){
  message_container.innerHTML += `<div class="bot">${message}</div>`;
  location.href = '#edge';
  
  // try cool stuff
  //synth.cancel();
  //talkToMe.text = "ladidadida";
  //talkToMe.voice = voices[vx.selectedIndex];
  //talkToMe.volume = volume.value;
  //talkToMe.pitch = pitch.value;
  //talkToMe.rate = rate.value;
  //synth.speak(talkToMe); 
  
}


function selfReply(message){
  message_container.innerHTML += `<div class="self">${message}</div>`;
  location.href = '#edge';
  
  bot.reply("local-user", message).then(function(reply) {
    
    botReply(reply);
    console.log('bot reply ==',reply)

       //.onEnd(myRec.start());
    
    //blunt way to deal with it because I dont understand promises well enough yet
    //setTimeout(function(){console.log('ready to activate rec'); myRec.start();}, 1500);
    
  
      if (reply=="Sorry I cannot do a French voice"){
         console.log('trying french voice);')
          talkToMe.voice = voices[8];		   
                bubblesize=200;
        
     }
   
          if (reply=="Sorry I cannot do an Italian voice"){
            console.log('trying italian voice);')
            talkToMe.voice = voices[11];	
                    videoflag=1;
              vid.showControls();
              vid.play(); // set the video to loop and start playing
            vid.onended(shiadone);
              vid.hide();
             background(0);
        
     }
    
       //cvcvcvc
          if (reply=="shia"){
            console.log('shia')
            //vid.showControls();
            videoflag=1;
            vid.play(); // set the video to loop and start playing
            vid.hide();
          
        
     }
    
    
    
    
    
              if (reply=="Sorry I cannot do a Dutch voice"){
                console.log('trying italia voice);')
          talkToMe.voice = voices[14];	
                bubblesize=20;
        
     }
    
                  if (reply=="Sorry I cannot do a male English voice"){
                console.log('trying male english voice);')
          talkToMe.voice = voices[0];		       
        
     }
    
    //new one
                      if (reply=="Why do you say I am lazy"){
                console.log('trying male english voice);')
          talkToMe.voice = voices[0];	
                         talkToMe.pitch = 0.1;
                        talkToMe.rate = 0.1;
        
     }
    

    
                        if (reply=="This is daddy and son"){
      message = new Paho.MQTT.Message("cleopatrashake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
                            message = new Paho.MQTT.Message("anthonyshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
                    if (reply=="This is mommy and daddy"){
      message = new Paho.MQTT.Message("cleopatrashake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
                            message = new Paho.MQTT.Message("anthonyshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
                        if (reply=="This is mommy and son"){
      message = new Paho.MQTT.Message("cleopatrashake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
                            message = new Paho.MQTT.Message("romeoshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
                          if (reply=="No I am not nervous at all"){
                console.log('trying male english voice);')
          talkToMe.voice = voices[3];	
                         talkToMe.pitch = 1.5;
                        talkToMe.rate = 1.5;
        
     }
    
                          if (reply=="I love the makerspace"){
                console.log('trying male english voice);')
          talkToMe.voice = voices[1];	
                         talkToMe.pitch = 1.5;
                        talkToMe.rate = 1.5;
        
     }
    
                  if (reply=="Sorry I cannot do a female English voice"){
                console.log('trying female English voice);')
          talkToMe.voice = voices[4];		       
        
     }
    
    
    if (reply=="Waking up the bug now"){
      message = new Paho.MQTT.Message("gobug");
      message.destinationName = "makerhamilton";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
   if (reply=="High pitch coming up"){
     console.log('trying high pitch')
            talkToMe.pitch = 2;
    }
    
       if (reply=="Low pitch coming up"){
            talkToMe.pitch = 0.1;
    }
    
       if (reply=="High speed coming up"){
         console.log('try high speed');
            talkToMe.rate = 1.5;
    }
    
       if (reply=="Low speed coming up"){
            talkToMe.rate = 0.3;
    }
    
           if (reply=="Back to normal speed"){
            talkToMe.rate = 1;
    }
    
           if (reply=="Back to normal pitch"){
            talkToMe.pitch = 1;
    }
                if (reply=="Common go left"){
      message = new Paho.MQTT.Message("left");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
          if (reply=="Anthony left"){
      message = new Paho.MQTT.Message("anthonyleft");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
            if (reply=="Anthony right"){
      message = new Paho.MQTT.Message("anthonyright");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
                if (reply=="Anthony shake"){
      message = new Paho.MQTT.Message("anthonyshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
        
          if (reply=="Romeo left"){
      message = new Paho.MQTT.Message("romeoleft");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
            if (reply=="Romeo right"){
      message = new Paho.MQTT.Message("romeoright");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
                if (reply=="Romeo shake"){
      message = new Paho.MQTT.Message("romeoshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
              if (reply=="Juliet left"){
      message = new Paho.MQTT.Message("romeoleft");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
            if (reply=="Juliet right"){
      message = new Paho.MQTT.Message("julietright");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
                if (reply=="Juliet shake"){
      message = new Paho.MQTT.Message("julietshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
       
                if (reply=="Shake your heads you naughty bugs"){
      message = new Paho.MQTT.Message("julietshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);  
       message = new Paho.MQTT.Message("cleopatrashake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);        
                  
                  
                  
    }
    
                    if (reply=="Girls shake your heads"){
      message = new Paho.MQTT.Message("julietshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);  
       message = new Paho.MQTT.Message("cleopatrashake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);                     
    }
    
                        if (reply=="Romeo and Juliet shake it up!"){
      message = new Paho.MQTT.Message("julietshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);  
       message = new Paho.MQTT.Message("romeoshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);                     
    }
    
                            if (reply=="Anthony and Cleopatra shake it up!"){
      message = new Paho.MQTT.Message("julietshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);  
       message = new Paho.MQTT.Message("romeoshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);                     
    }
    
                        if (reply=="Boys shake your heads"){
      message = new Paho.MQTT.Message("romeoshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);  
       message = new Paho.MQTT.Message("anthonyshake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);                     
    }
    
    
    

    
        if (reply=="Cleopatra left"){
      message = new Paho.MQTT.Message("cleopatraleft");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
            if (reply=="Cleopatra right"){
      message = new Paho.MQTT.Message("cleopatraright");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
            if (reply=="Cleopatra shake"){
      message = new Paho.MQTT.Message("cleopatrashake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
                if (reply=="Common go right"){
      message = new Paho.MQTT.Message("right");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
                    if (reply=="Common shake your bugh head"){
      message = new Paho.MQTT.Message("shake");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
                        if (reply=="Come a little closer"){
      message = new Paho.MQTT.Message("forward");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
                        if (reply=="Back you go"){
      message = new Paho.MQTT.Message("back");
      message.destinationName = "awesomebot";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
    
    if (reply=="Popping the balloon now"){
      message = new Paho.MQTT.Message("1");
      message.destinationName = "awesomebot";
      console.log('sending to mqtt);')
      client.send(message);    
    }
    
        if (reply=="balloon is safe"){
      message = new Paho.MQTT.Message("balloonsafe");
      message.destinationName = "makerhamilton";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
        if (reply=="OK switching fan on"){
      message = new Paho.MQTT.Message("200");
      message.destinationName = "makerhamilton";
      console.log('bingo just before send);')
      client.send(message);    
    }
    
       
            if (reply=="OK switching fan off"){
      message = new Paho.MQTT.Message("20");
      message.destinationName = "makerhamilton";
      console.log('bingo just before send);')
      client.send(message);    
    }
        talkToMe.text = reply;
      
    synth.speak(talkToMe);
  });
  
  
}

function botReady(){
  bot.sortReplies();
  botReply('Hello, lets get MQTT ready...');
  
    //talkToMe.text = "ladidadida";
   //synth.speak(talkToMe);

}

function botNotReady(err){
  console.log("An error has occurred.", err);
}


  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
      console.log("MQTT connection lost", 20, 40);
      botReply('Oops MQTT lost');
    }
  }

  // called when a message arrives
//   function onMessageArrived(message) {
//     console.log("onMessageArrived:"+message.payloadString);
//     var canvas = document.getElementById("myCanvas");
//     var ctx = canvas.getContext("2d");
//     ctx.fillStyle = "#FF0000";
//     ctx.fillRect(0, 0, message.payloadString, 75)
    
//     //background(100);
//     //ellipse(50, message.payloadString, 100,100);    
//   }

	function parseResult()
	{
		// recognition system will often append words into phrases.
		// so hack here is to only use the last word:
// 		var mostrecentword = myRec.resultString.split(' ').pop();
// 		if(mostrecentword.indexOf("left")!==-1) { dx=-1;dy=0; }
//     else if(mostrecentword.indexOf("list")!==-1) { dx=-1;dy=0; }
//     else if(mostrecentword.indexOf("let")!==-1) { dx=-1;dy=0; }
//     else if(mostrecentword.indexOf("next")!==-1) { dx=-1;dy=0; }
    
// 		else if(mostrecentword.indexOf("right")!==-1) { dx=1;dy=0; }
// 		else if(mostrecentword.indexOf("up")!==-1) { dx=0;dy=-1; }
//     		else if(mostrecentword.indexOf("app")!==-1) { dx=0;dy=-1; }
//     else if(mostrecentword.indexOf("grow")!==-1) { dx=0;dy=-1; }
//     else if(mostrecentword.indexOf("vulcano")!==-1) { dx=0;dy=-1; }
// 		else if(mostrecentword.indexOf("down")!==-1) { dx=0;dy=1; }
// 		else if(mostrecentword.indexOf("clear")!==-1) { background(255); }
//     else if(mostrecentword.indexOf("amanda")!==-1) { background(255); }
		console.log(myRec.resultString);
    selfReply(myRec.resultString);
    //promise.then(myRec.start());       
    
	}

function doneitall(){
  console.log('you beaute');
  
}

function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  
  //setTimeout(function(){console.log('ready to activate rec'); myRec.start();}, 1500);
  //onEnd(console.log('eeeendeedd'));myRec.start();
  //setTimeout(function(){console.log('ready to activate rec'); myRec.start();}, 2000);
  //
    //.onEnd(myRec.start());
  //setTimeout(function(){console.log('ready to activate rec'); myRec.start();}, 2000);
  // setTimeout(function(){ alert("Hello"); }, 3000);
  //setTimeout(function(){synth.speak(talkToMe);}, 3000);
    
    //synth.speak(talkToMe);
    //background(100);
    //ellipse(50, message.payloadString, 100,100);
    
  }


function speak(){
  synth.cancel();
  talkToMe.text = ohSayWhat.value;
  if(ohSayWhat.value == ""){
    talkToMe.text = "Enter some text in the field above."
  }
  
  talkToMe.voice = voices[4];
   // talkToMe.voice = voices[vx.selectedIndex];
  talkToMe.volume = volume.value;
  talkToMe.pitch = pitch.value;
  talkToMe.rate = rate.value;
  synth.speak(talkToMe);
}


// copied from MDN thanks guys
function populateVoiceList() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  voices = speechSynthesis.getVoices();
  //console.log(voices);
  voicescount = voices.length;
  for(i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    document.getElementById("voiceSelect").appendChild(option);
  }
}

populateVoiceList();

if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
// end copy


