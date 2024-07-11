// import {
//   ConnectedSocket,
//   MessageBody,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { ChatService } from './chat.service';
// import { OnModuleInit } from '@nestjs/common';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class ChatGateway implements OnModuleInit {
//   @WebSocketServer()
//   public server: Server;

//   constructor(private readonly chatService: ChatService) {}

//   onModuleInit() {
//     this.server.on('connection', (socket: Socket) => {
//       const { name, token } = socket.handshake.auth;

//       if (!name) {
//         socket.disconnect();
//         return;
//       }
//       console.log('Cliente conectado: ', name, token);

//       this.chatService.onClientConnected({ id: socket.id, name: name });

//       socket.emit('welcome-message', 'Bienvenido al servidor');

//       this.server.emit('on-clients-changed', this.chatService.getClients());

//       socket.on('disconnect', () => {
//         this.chatService.onClientDisconnected(socket.id);
//         this.server.emit('on-clients-changed', this.chatService.getClients());
//       });
//     });
//   }

//   @SubscribeMessage('send-message')
//   handleMessage(
//     @MessageBody() message: string,
//     @ConnectedSocket() client: Socket,
//   ) {
//     const { name } = client.handshake.auth;
//     console.log(name, message);

//     if (!message) {
//       return;
//     }

//     this.server.emit('on-message', {
//       userId: client.id,
//       message: message,
//       name: name,
//     });
//   }

//   @SubscribeMessage('send-private-message')
//   async handleSendPrivateMessage(
//     @MessageBody()
//     data: { senderId: string; receiverId: string; content: string },
//     @ConnectedSocket() client: Socket,
//   ) {
//     try {
//       // const message = await this.chatService.sendMessage(data.senderId, data.receiverId, data.content);
//       client.emit('private-message-sent', data);
//       this.server.to(data.receiverId).emit('private-message-received', data);
//     } catch (error) {
//       console.error('Error sending private message:', error.message);
//     }
//   }
// }
