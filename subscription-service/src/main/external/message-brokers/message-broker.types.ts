export interface MessageBroker<Connection, Channel> {
  connection: Connection;
  connect(): Promise<Connection | undefined>;
  disconnect(): Promise<void>;
  getConnection(): Connection | undefined;
  createChannel(): Promise<Channel>;
}
