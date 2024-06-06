const int pinLedRojo = 9; // Ocupado
const int pinLedVerde = 10; // Libre
const int pinLedAzul = 11; // Compartir

void setup() {
  Serial.begin(9600);

  pinMode(pinLedRojo, OUTPUT);
  pinMode(pinLedVerde, OUTPUT);
  pinMode(pinLedAzul, OUTPUT);

  // Apagar todos los LEDs inicialmente
  analogWrite(pinLedRojo, 255);
  analogWrite(pinLedVerde, 255);
  analogWrite(pinLedAzul, 255);
}

void loop() {
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    command.trim();

    if (command == "libre") {
      setColor(0, 255, 0);  // Verde
    } else if (command == "ocupado") {
      setColor(255, 0, 0);  // Rojo
    } else if (command == "compartir") {
      setColor(0, 0, 255);  // Azul
    }
  }
}

void setColor(int r, int g, int b) {
  analogWrite(pinLedRojo, 255 - r);
  analogWrite(pinLedVerde, 255 - g);
  analogWrite(pinLedAzul, 255 - b);
}
