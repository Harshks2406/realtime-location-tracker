const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const app = express();
const http = require('http');

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on('connection', function(socket){
    socket.on("send-location", function(data){
        io.emit("received-location", {id: socket.id, ...data});
    })
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id)
    })
});

app.get('/', function(req, res){
    res.render("index");
});

server.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
});