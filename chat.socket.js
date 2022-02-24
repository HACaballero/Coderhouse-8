var moment = require("moment");
const { insertMensaje, selectMensajes } = require("./sqlite/sqlite3");

let mensajes = [
	{
		email: "test@gmail.com",
		date: "12/2/2022 20:32:21",
		mensaje: "Hola",
	},
];
async function getMensajes() {
	return await selectMensajes();
}

async function socketChat(io, socket) {
	mensajes = await selectMensajes();
	socket.on("nuevo_mensaje", (data) => {
		data.date = moment().toString();
		insertMensaje(data);
		mensajes.push(data);
		io.sockets.emit("mensajes", mensajes);
	});
}

module.exports = {
	getMensajes,
	socketChat,
};
