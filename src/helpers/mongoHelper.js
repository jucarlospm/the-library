import mongo from '@condor-labs/mongodb';
import logger from '@condor-labs/logger';
import env from 'dotenv';

env.config();

const settings = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  database: process.env.MONGO_DATABASE,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASS,
  ssl: false,
  authSource: process.env.MONGO_AUTH_SOURCE,
};

const connectMongo = mongo(settings);

const helper = {
  clients: {},
  connect: async () => {
    try {
      let client = await connectMongo.getClient();
      helper.clients = client;
      return mongo;
    } catch (e) {
      logger.error(e);
    }
  },
  getClient: async () => {
    await mongo.getClient();
  },
  closed: async () => {
    await mongo.mongoose.connection.close();
  },
};

module.exports = helper;
