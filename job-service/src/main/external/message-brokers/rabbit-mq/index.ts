import amqp, { Channel, Connection } from 'amqplib';

import { MessageBroker } from '../message-broker.types';

class RabbitMQ implements MessageBroker<Connection, Channel> {
  connection: Connection;

  async connect() {
    if (process.env.RABBIT_MQ_URL) this.connection = await amqp.connect(process.env.RABBIT_MQ_URL!);
    return this.connection;
  }

  async disconnect() {
    await this.connection.close();
  }

  async createChannel() {
    return this.connection.createChannel();
  }

  getConnection() {
    return this.connection;
  }
}

export default RabbitMQ;
