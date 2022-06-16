const socket = io();

// socket.on('bienvenida', (mensaje) => {
//     alert(mensaje);
// })

socket.on('mensajes', (mensajes) => {
    document.getElementById("mensajes").textContent = mensajes;
});

document.getElementById("botonEnviar").addEventListener("click", (ev) => {
    // socket.emit('mensaje', ev.target.value);
    const mensaje = document.getElementById("entrada").value;
    socket.emit('mensaje', mensaje)
   
});