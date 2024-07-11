// item.gateway.ts
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AgencyRepository } from './agency.repository';


@WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
export class AgencyGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly agencyRepository: AgencyRepository) {}

  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    this.sendAllItems(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getAllItems')
  async handleGetAllItems(client: Socket): Promise<void> {
    this.sendAllItems(client);
  }

  private async sendAllItems(client: Socket): Promise<void> {
    const items = await this.agencyRepository.getDisableAgency()
    // console.log('Items fetched from database:', items);
    client.emit('allDisableAgency', items);
  }

  async emitAgencyUpdate(): Promise<void> {
    const items = await this.agencyRepository.getDisableAgency();
    this.server.emit('allDisableAgency', items);
  }
}

