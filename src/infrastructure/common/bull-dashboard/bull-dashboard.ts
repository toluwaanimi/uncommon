import { envConfig } from '../../config/environment-config/environment.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Queue = require('bull');

const {
  ExpressAdapter,
  createBullBoard,
  BullAdapter,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('@bull-board/express');

// Redis connection options
const connectionOptions = {
  host: envConfig.getRedisURL(),
  port: envConfig.getRedisPort(),
  password: envConfig.getRedisPassword(),
};

// Create an array of Bull queues with the given options
const queues = ['processEvents', 'events']
  .map((queueName) => new Queue(queueName, { redis: { ...connectionOptions } }))
  .map((queue) => new BullAdapter(queue));

// Initialize an Express adapter and set the base path
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

// Initialize BullBoard with the configured queues and server adapter
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues,
  serverAdapter,
});

// Mount the BullBoard UI and API on the given Express app
export function bullDashboard(app) {
  app.use('/admin/queues', serverAdapter.getRouter());
}
