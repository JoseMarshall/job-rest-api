import { MessageBroker } from './message-broker.types';

interface PubMessageDependencies<Connection, Channel> {
  msg: Record<string, any> | string;
  messageBroker: MessageBroker<Connection, Channel>;
  queue: string;
}

// eslint-disable-next-line import/prefer-default-export
export async function pubMessage<T, R>({
  msg,
  messageBroker,
  queue,
}: PubMessageDependencies<T, R>) {
  const connection = await messageBroker.connect();
  const channel = await (connection as any).createChannel();
  channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
  await messageBroker.disconnect();
}
