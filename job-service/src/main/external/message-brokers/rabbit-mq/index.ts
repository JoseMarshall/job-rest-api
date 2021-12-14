import amqp, { Channel, Connection } from 'amqplib';

import { MessageBroker } from '../message-broker.types';

class RabbitMQ implements MessageBroker<Connection, Channel> {
  connection: Connection;

  async connect() {
    if (process.env.RABBIT_MQ_URL) this.connection = await amqp.connect(process.env.RABBIT_MQ_URL!);
    return this.connection;
  }

  async disconnect() {
    setTimeout(() => {
      this.connection.close();
    }, 500);
  }

  async createChannel() {
    return this.connection.createChannel();
  }

  getConnection() {
    return this.connection;
  }
}

export default RabbitMQ;
