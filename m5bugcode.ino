//BC mqtt breakdown routines included GREAT!! Stable pressed up to Confirmed reconnected can still clean up error code removal after mqtt reconnects
// activated by this programme in glitch  https://bugc-mqtt.glitch.me/

#include <M5StickC.h>
#include <PubSubClient.h>
#include <WiFiMulti.h>
#include <WiFi.h>
#include "bugC.h"

WiFiMulti wifiMulti;
          String wagwoord;
          char wagwoordchar[10];

//const char* ssid = "braamiphone";
//const char* password = "ilanga13";
const char* mqttServer = "m14.cloudmqtt.com";
const int mqttPort = 13337;
const char* mqttUser = "yyqzwwpb";
const char* mqttPassword = "UHDKx2H5Jmp_";
//incoming topic


//suscribe to other guy
const char* inTopic = "awesomebot";
const int button = 37;
int last_value = 0;
int last_value1 = 0;
int cur_value1 = 0;
int cur_value = 0;
const int button1 = 39;
int counter = 0;
int relay_pin = 33;
int netscore = 0;
int otherplayerscore = 0;

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(1000);

  Serial.println();
  Serial.print("Connecting to ");
 // Serial.println(ssid);
  //wifiMulti.addAP("M-Guest", "mrpwireless!");
  wifiMulti.addAP("MostlyHarmless", "Bacon1342!");
  //wifiMulti.addAP("braamiphone", "ilanga13");
    Serial.println("Connecting Wifi...");
    if(wifiMulti.run() == WL_CONNECTED) {
        Serial.println("");
        Serial.println("WiFi connected");
        Serial.println("IP address: ");
        Serial.println(WiFi.localIP());
    }


  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  }


void setup() {
  // init lcd
          for (int i = 0; i<10 ; i++){
          wagwoordchar[i]=random(65,90);
          //Serial.println(String(wagwoordchar[i]));
        }
        wagwoord = String(wagwoordchar);
  
  M5.begin();
  M5.Axp.SetChargeCurrent(CURRENT_360MA);
  Wire.begin(0, 26, 400000);
  M5.Lcd.setRotation(3);
  pinMode(button, INPUT);
  M5.Lcd.fillRect(0,0,400,20,BLACK);
  M5.Lcd.setTextColor(YELLOW);
  M5.Lcd.setCursor(40, 0); M5.Lcd.println("JOHN");
  BugCSetColor(0x000000, 0x000000);
  //Serial.println("Button example: ");
  M5.Lcd.setTextColor(WHITE);
  setup_wifi();
//wifi and mqtt connect

  //Serial.println("Connected to the WiFi network");
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
  
  while (!client.connected()) {
  Serial.println("Connecting to MQTT...");
  if (client.connect(wagwoordchar, mqttUser, mqttPassword )) {
    Serial.println("connected");
    //try to subscribe to topic here
    client.subscribe(inTopic);
  } else {
  Serial.print("failed with state ");
    Serial.print(client.state());
    delay(2000);
  }
  }
  for (int i=0; i<100; i++) {
  client.publish("braambeer", "beer 1");
  }
  client.publish("braambeerklaar", "beertjie slaap");
  //to get incoming
 
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
  Serial.print("Attempting MQTT connection...");
  M5.Lcd.fillRect(0,0,400,20,BLACK);
  M5.Lcd.setCursor(10, 0); M5.Lcd.println("Attempting MQTT reconnect   ");
  M5.Lcd.setCursor(10,20); M5.Lcd.println("   not connected...   ");
  // Attempt to connect
  if (client.connect(wagwoordchar,mqttUser,mqttPassword)) {
  Serial.println("connected");
  M5.Lcd.fillRect(0,0,400,400,BLACK);
  //M5.Lcd.setCursor(10, 0); M5.Lcd.println("MQTT send   ");
  //M5.Lcd.setCursor(10,10); M5.Lcd.println("Mqtt reconnected   ");
  //get hooked up to incoming messagess
  client.subscribe(inTopic);
  
  } else {
  Serial.print("failed, rc=");
  Serial.print(client.state());
  Serial.println(" try again in 5 seconds");
  // Wait 5 seconds before retrying
  delay(3000);
  }
  }
}




void loop() {
  
  M5.update();
  
  cur_value = digitalRead(button);// read the value of BUTTON
  cur_value1 = digitalRead(button1);// read the value of BUTTON
  //reset counter to zero if right side button is pressed
  if(cur_value1 != last_value1){
     if(cur_value1==0){
      Serial.println('you pushed it');
      counter=0;   
      M5.Lcd.fillRect(95,45,25,15,BLACK);   
      M5.Lcd.setCursor(95,25); M5.Lcd.print(counter);      
     }
    last_value1 = cur_value1;
  };


  
  M5.Lcd.setTextColor(YELLOW);
  M5.Lcd.setCursor(40, 0); M5.Lcd.println("JOHN");
  //Serial.println("Button example: ");
  M5.Lcd.setTextColor(WHITE);
  M5.Lcd.setCursor(0,25); M5.Lcd.println("Player A ");
  M5.Lcd.setCursor(0,45); M5.Lcd.print("Player B: ");
  M5.Lcd.setCursor(0,65); M5.Lcd.println("Net score ");

  if(cur_value != last_value){
    
    if(cur_value==0){
      M5.Lcd.fillRect(95,45,25,15,BLACK);
      counter +=1;
      char buffer[10];
      dtostrf(counter,0, 0, buffer);
      M5.Lcd.setCursor(95,45); M5.Lcd.print(counter);
      netscore = counter - otherplayerscore;
      M5.Lcd.fillRect(80,60,400,90,BLACK);
      M5.Lcd.setCursor(95,65); M5.Lcd.print(netscore);
      
      client.publish("braambeerbbb",buffer);
    }
    else{

    }
    last_value = cur_value;
  
  }
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}



     void LaughSpin(){
        for (int i = 0;i<4; i++){
            BugCSetAllSpeed(100, 100, 100, 100);
            delay(50);
            BugCSetAllSpeed(-100, -100, -100, -100);
            delay(50);
        }
        delay(500);
     }



void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String boodskap;  
  boodskap = "";
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    boodskap += (char)payload[i];
  }
  Serial.println();
  Serial.print("boodskap = ");
  Serial.print(boodskap);
    Serial.print("callback length = ");
  Serial.print(length);
  Serial.println("boodskap se eerste char   ");
  Serial.println(boodskap.charAt(0)); 
  Serial.println("boodskap se length -2 char   ");
  //Serial.println(boodskap.charAt(length-2));  //somehow this is needed else it adds a trailing character!!!
  //boodskap = boodskap.substring(0,length-1);
  
  //Serial.println("Peter" == "Peter");
  if (boodskap == "forward"){

          ShakeHead();
          BugCSetAllSpeed(0, 0, 0, 0);
  }  else if (boodskap == "left"){

    SidewaysLeft(); delay(1000);
    BugCSetAllSpeed(0, 0, 0, 0);  delay(2000);   

  } else if (boodskap == "right"){

    SidewaysRight();delay(1000);
    BugCSetAllSpeed(0, 0, 0, 0);  delay(1000);    

  }  else if (boodskap == "forward"){
    Forward(); delay(1000); //let it go forward for one sec. and so on below
    BugCSetAllSpeed(0, 0, 0, 0);  delay(1000);   

  }  

 else if (boodskap == "back"){
    Backward();delay(1000);
    BugCSetAllSpeed(0, 0, 0, 0);  delay(1000);   
  }  

   else if (boodskap == "shake"){

    ShakeHead();delay(1000);
    BugCSetAllSpeed(0, 0, 0, 0);  delay(1000);    

  }  


  
  //char buffer[10];
  //boodskap.toCharArray(buffer,boodskap.length()+1);

  Serial.println("buffer = ");
  //Serial.print(buffer);
  M5.Lcd.fillRect(60,20,400,25,BLACK);
  M5.Lcd.setCursor(95,25); M5.Lcd.print(boodskap);
}




   void Forward(){
        BugCSetAllSpeed(100, -100, 100, -100);    
     }

   void Backward(){
        BugCSetAllSpeed(-100, 100, -100, 100);      
     }


     void ShakeHead(){
        for (int i = 0;i<10; i++){
            BugCSetAllSpeed(100, 100, 100, 100);
            delay(250);
            BugCSetAllSpeed(-100, -100, -100, -100);
            delay(250);
        }
        BugCSetAllSpeed(0, 0, 0, 0);
       }
     
      //Sideways left from hugs persp
      void SidewaysLeft(){
        BugCSetAllSpeed(-100, -100, 100, 100);
       }

      //Sideways right from hugs persp
      void SidewaysRight(){
        BugCSetAllSpeed(100, 100, -100, -100);
      }

