const IORedis = require("ioredis");
const redis = new IORedis();

class Redis {
  name_column_redis;
  constructor (name_column_redis) {
    this.name_column_redis = name_column_redis
  }

  async hget(key) {
    return await redis.hget(this.name_column_redis, key);
  }

  async hset(key, value) {
    return await redis.hset(this.name_column_redis, key, JSON.stringify(value));
  }

  async get(key) {
    return await redis.get(key);
  }

  async set(key, value) {
    return await redis.set(key, value);
  }
}

module.exports = Redis;