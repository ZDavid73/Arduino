const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración del puerto serial para Arduino UNO en COM3
const protocolConfiguration = {
  path: 'COM3',
  baudRate: 9600
};

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Servir archivos estáticos
app.use(express.static('public'));

// Manejar la conexión WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('command', (command) => {
    console.log('Comando recibido:', command);
    port.write(command + '\n');
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 4091;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
