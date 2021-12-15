import { MessageBroker } from './message-broker.types';

interface PubMessageDependencies<Connection, Channel> {
  cb: (message: any) => Promise<void>;
  messageBroker: MessageBroker<Connection, Channel>;
  queue: string;
}

// eslint-disable-next-line import/prefer-default-export
export async function consumeMessage<T, R>({
  cb,
  messageBroker,
  queue,
}: PubMessageDependencies<T, R>) {
  const connection = await messageBroker.connect();
  const channel = await (connection as any).createChannel();
  channel.assertQueue(queue, { durable: false });
  channel.consume(queue, cb, {
    noAck: true,
  });
}
