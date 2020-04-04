/*

 It connects to an MQTT server then:
  - on 0 switches off relay
  - on 1 switches on relay
  - on 2 switches the state of the relay

  - sends 0 on off relay
  - sends 1 on on relay

 It will reconnect to the server if the connection is lost using a blocking
 reconnect function. See the 'mqtt_reconnect_nonblocking' example for how to
 achieve the same result without blocking the main loop.

 The current state is stored in EEPROM and restored on bootup

*/

#include <WiFi.h>
#include <PubSubClient.h>
#include <U8x8lib.h>

const char* ssid = "MostlyHarmless";
const char* password = "Bacon1342!";
const char* mqttServer = "m14.cloudmqtt.com";
const int mqttPort = 13337;
const char* mqttUser = "yyqzwwpb";
const char* mqttPassword = "UHDKx2H5Jmp_";
const char* inTopic = "awesomebot";
U8X8_SSD1306_128X64_NONAME_SW_I2C u8x8(/* clock=*/ 15, /* data=*/ 4, /* reset=*/ 16);
WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0;
char msg[50];
int value = 0;

int relay_pin = 33;

void setup_wifi() {
  delay(1000);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    
  delay(500);
  Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
            u8x8.clearDisplay();
        //u8x8.drawString(0, 0, skermarray);
        u8x8.draw2x2String(0, 4, "Wifi ctd");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  }

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
  Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '0') {
  digitalWrite(relay_pin, LOW); // Turn the LED on (Note that LOW is the voltage level
  Serial.println("relay_pin -> LOW");

            u8x8.clearDisplay();
        //u8x8.drawString(0, 0, skermarray);
        u8x8.draw2x2String(0, 4, "OFF");
  // relayState = LOW;
  } else if ((char)payload[0] == '1') {
  digitalWrite(relay_pin, HIGH); // Turn the LED off by making the voltage HIGH
  Serial.println("relay_pin -> HIGH");
  delay(3000);
   digitalWrite(relay_pin, LOW);
  
        u8x8.clearDisplay();
        //u8x8.drawString(0, 0, skermarray);
        u8x8.draw2x2String(0, 4, "ON");
  // relayState = HIGH;
  } else if ((char)payload[0] == '2') {
  delay(10);
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
  Serial.print("Attempting MQTT connection...");
  // Attempt to connect
  if (client.connect("ESP32Client",mqttUser,mqttPassword)) {
  Serial.println("connected");
          u8x8.clearDisplay();
        //u8x8.drawString(0, 0, skermarray);
        u8x8.draw2x2String(0, 4, "MQTT rectd");
  // Once connected, publish an announcement...
  //client.publish(outTopic, "Sonoff1 booted");
  // ... and resubscribe
  client.subscribe(inTopic);
  } else {
  Serial.print("failed, rc=");
  Serial.print(client.state());
  Serial.println(" try again in 5 seconds");
  // Wait 5 seconds before retrying
  }
  }
}

void setup() {
   u8x8.begin();
  u8x8.setFont(u8x8_font_chroma48medium8_r);
  pinMode(relay_pin, OUTPUT); // Initialize the relay pin as an output
  Serial.begin(115200);
  setup_wifi(); // Connect to wifi
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
  reconnect();
  }
  client.loop();
}