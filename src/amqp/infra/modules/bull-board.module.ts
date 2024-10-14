import { BullAdapter } from '@bull-board/api/bullAdapter';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AmqpModule } from '@/amqp/infra/modules/amqp.module';

@Module({
  imports: [AmqpModule],
})
export class BullBoardModule implements NestModule {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/bull-board');

    createBullBoard({
      queues: [new BullAdapter(this.emailQueue)],
      serverAdapter,
    });

    consumer.apply(serverAdapter.getRouter()).forRoutes('/bull-board');
  }
}
