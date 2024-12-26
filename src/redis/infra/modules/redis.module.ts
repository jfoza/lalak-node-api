import { Global, Module } from '@nestjs/common';
import { RedisRepository } from '@/redis/infra/repositories/redis.repository';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { IRedisRepository } from '@/redis/domain/repositories/redis.repository.interface';

@Global()
@Module({
  providers: [
    {
      provide: IRedisRepository,
      useFactory: async (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST');
        const redisPort = configService.get<number>('REDIS_PORT');
        const redisPassword = configService.get<string>('REDIS_PASS');

        const redisClient = new Redis({
          host: redisHost,
          port: redisPort,
          password: redisPassword,
        });

        return new RedisRepository(redisClient);
      },
      inject: [ConfigService],
    },
  ],
  exports: [IRedisRepository],
})
export class RedisModule {}
