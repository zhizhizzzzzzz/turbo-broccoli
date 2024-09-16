const dgram = require('dgram');
const WebSocket = require('ws');

// 创建UDP服务器
const udpServer = dgram.createSocket('udp4');

// 监听指定的IP地址和端口
udpServer.bind(8081, '192.168.10.230');

// 创建WebSocket服务器
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
  console.log('WebSocket连接已建立');
  
  udpServer.on('message', (message) => {
    console.log('接收到UDP数据：' + message);
    ws.send(message);
  });
});

console.log('服务器已启动，正在监听192.168.10.230:8000');
