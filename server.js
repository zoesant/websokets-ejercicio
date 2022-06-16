const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

// const socketMap = {
//     "idDelSocket": "loQueEscribeElUser"
// };

const mensajes = [];
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');

})

const httpServer = new HttpServer(app);
const ioServer = new IOServer(httpServer);

ioServer.on('connection', (socket) => {
    console.log('Se conecto un usuario');
    // socket.emit('bienvenida', 'Bienvenidos')
    socket.on('mensaje', (mensaje) => {
        // if (!socketMap[socket.id]) socketMap[socket.id] = '';
        // socketMap[socket.id] = mensaje;
        mensajes.push(`[${socket.id}]: ${mensaje}\n`)
        // const mensajeConcatenado = Object
        // .entries(socketMap)
        // .map(([socketId, mensaje]) => {
        //     return `[${socketId}]: ${mensaje}`;
        // })
        // .join('\n');

        ioServer.sockets.emit('mensajes', mensajes.join(`\n`));
    })
});

httpServer.listen(3000, () => {
    console.log('escuchando')
})