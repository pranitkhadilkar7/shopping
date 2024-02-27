import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({ namespace: 'events' })
export class EventsGateway implements OnGatewayInit {
  server: Server

  afterInit(server: Server) {
    this.server = server
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: any) {
    console.log(data)
    this.server.emit('event-receiver', { msg: 'event received' })
  }
}
