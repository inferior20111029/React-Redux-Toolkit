const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:3002' })); // 使用CORS中間件，允許來自http://localhost:3002的請求

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3002", // 替換為你的前端應用程序的URL
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('notifyPage2', (count) => {
        io.emit('notifyPage2', count); // 向所有連接的客戶端廣播消息
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // Emit a message every second
    setInterval(() => {
        socket.emit('message', 'Hello from server');
    }, 1000);
});

server.listen(3001, () => {
    console.log('Server is running on port 3000');
});
