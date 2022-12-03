const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors : {
        origin: "http://localhost:3000",
        methods: ["GET" , "POST"]
    },
});

io.on("connection", (socket) => {
console.log(`User connected : ${socket.id}`);

socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with id : ${socket.id} joined room : $(data)`);
});

socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message" ,data);
})
socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
})
});

app.get("/", function(req,res){
    res.send({ response: "I am alive" }).status(200);
})

server.listen(3000, () => {
    console.log("Server started on port 3000.");
})