import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AmqpController } from '@/amqp/presentation/controllers/amqp.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASS'),
        },
      }),
    }),

    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [],
  controllers: [AmqpController],
  exports: [BullModule],
})
export class AmqpModule {}
