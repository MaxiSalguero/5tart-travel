import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRepository } from './chatRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entidades/user.entity';
import { Repository } from 'typeorm';
import { ChatService } from './chat.service';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly chatService : ChatService, @InjectRepository(UserEntity) private userRepository : Repository<UserEntity>){}

  private connectedUsers: Set<UserEntity> = new Set<UserEntity>();

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
      const username = client.handshake.auth.username
      const user = await this.userRepository.findOneBy({ email: username });
      user.id = client.id
      this.connectedUsers.add(user)
      console.log(`${username} se ha conectado`)
      console.log('usuarios conectados: ')
      this.connectedUsers.forEach((usuario) => {
        console.log(usuario.email)
      })
  }

  handleDisconnect(client: Socket) {
    const username = client.handshake.auth.username
    this.connectedUsers.forEach((usuario) => {
      if (usuario.email === username) {
        this.connectedUsers.delete(usuario);
      }
    });
    console.log(`${username} se ha desconectado`);
  }


  @SubscribeMessage('chatMessage')
  handleChatMessage(@ConnectedSocket() client: Socket, @MessageBody() data: { recipient: string; message: string } ) {
    const username = client.handshake.auth.username;
    
    const recipientOn = Array.from(this.connectedUsers).find((user) => user.email === data.recipient);
    if(recipientOn){
      this.server.to(recipientOn.id).emit('chatMessage',{
        senderEmail: username,
        message: data.message
      
      })
      console.log(`El usuario ${username} envío el siguiente mensaje al usuario ${data.recipient}: ${data.message}`)
      this.chatService.newMessage(data.message)
    }else{
      console.log('Usuario no conectado')
    }
    
  }

  @SubscribeMessage('chatTyping')
  handleChatTyping(@ConnectedSocket() client: Socket, @MessageBody() data: {username: string, recipient: string}) {
    const recipientOn = Array.from(this.connectedUsers).find((user) => user.email === data.recipient);
    if(recipientOn){
      client.to(recipientOn.id).emit('chatTyping',data.username)
      }
  }
}
