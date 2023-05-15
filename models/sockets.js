const Marcadores = require("./marcadores");

class Sockets {

    constructor(io) {

        this.io = io;

        this.marcadores = new Marcadores()

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            // console.log('Cliente conectado')
            // Todo: marcadores-activos
            socket.emit('marcadores-activos', this.marcadores.activos);
            // Todo: marcador-nuevo
            socket.on('marcador-nuevo', (marcador) => {
                // console.log('marcador-nuevo');
                // console.log(marcador);
                this.marcadores.agregarMarcador(marcador);
                socket.broadcast.emit('marcador-nuevo', marcador);
            });

            // Todo: actualizar-marcador
            socket.on('marcador-actualizado', (marcador) => {
                // console.log('marcador-actualizado');
                // console.log(marcador);
                this.marcadores.actualizarMarcador(marcador);
                socket.broadcast.emit('marcador-actualizado', marcador);
            });

        });
    }


}


module.exports = Sockets;