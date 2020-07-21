require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.set('origins', '*:*');
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

client.on('message', (msg) => {
    // msg.react('👃')
    io.emit('new-message', { user: msg.author, content: msg.content })
})
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

client.login(process.env.DISCORD_TOKEN);