import { config } from 'dotenv';
import path from 'path';

import { logger } from '../utils/logger';
import { consumeMessage } from './external/message-brokers/helpers';
import { MessageBroker } from './external/message-brokers/message-broker.types';
import RabbitMQ from './external/message-brokers/rabbit-mq';
import { MongoHelper } from './external/repositories/mongodb/helpers/mongo-helper';
import { DatabaseHelper } from './external/repositories/repository.types';
import consumers, { Consumer } from './message-consumers';

interface AppDependencies {
  dbHelper: DatabaseHelper;
  messageBroker: MessageBroker<any, any>;
  consumers: ReadonlyArray<Consumer>;
}

const start = async ({ dbHelper, messageBroker, consumers }: AppDependencies) => {
  try {
    config({
      path: path.resolve(
        process.cwd(),
        `.env.${process.env.TS_NODE_DEV ? 'development' : 'production'}`
      ),
    });

    await dbHelper.connect();

    logger.info(`Notification Service running`);

    await Promise.all(
      consumers.flatMap(({ fn, queue }) => [consumeMessage({ cb: fn, queue, messageBroker })])
    );
  } catch (error) {
    logger.error(error);
  }
};

start({ dbHelper: MongoHelper, messageBroker: new RabbitMQ(), consumers }).then();

process.on('uncaughtException', err => {
  logger.error(`${new Date().toUTCString()} uncaughtException:`, err.message);
  logger.error(err.stack ?? '');
  process.exit(1);
});
