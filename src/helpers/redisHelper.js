import redis from '@condor-labs/redis';
import logger from '@condor-labs/logger';
import env from 'dotenv';

env.config();

const settings = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

const connectRedis = redis(settings);

let redisBatch;

const helper = {
  connect: async () => {
    try {
      const client = await connectRedis.getClient();
      redisBatch = client.batch();
    } catch (e) {
      logger.error(e);
    }
  },
  setCacheData: async (key, data) => {
    try {
      await redisBatch.set(key, JSON.stringify(data));
      return redisBatch.execAsync();
    } catch (e) {
      logger.error(e);
    }
  },
  getCacheData: async (key) => {
    await redisBatch.get(key);
    return redisBatch.execAsync();
  },
  addData: async (key, data) => {
    if (data.length > 0) {
      await redisBatch.hset(key, JSON.stringify(data));
      return redisBatch.execAsync();
    }
  },
  deleteCacheData: async (key) => {
    await redisBatch.del(key);
    return redisBatch.execAsync();
  },
};

module.exports = helper;
