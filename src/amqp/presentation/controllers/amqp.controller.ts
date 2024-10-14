import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Res } from '@nestjs/common';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';

@Controller('admin/queues')
export class AmqpController {
  private readonly serverAdapter: ExpressAdapter;

  constructor(
    @InjectQueue('email')
    private readonly emailQueue: Queue,
  ) {
    this.serverAdapter = new ExpressAdapter();
    this.serverAdapter.setBasePath('/admin/queues');

    createBullBoard({
      queues: [new BullAdapter(this.emailQueue)],
      serverAdapter: this.serverAdapter,
    });
  }

  @Get('/')
  renderBoard(@Res() res: Response) {
    const expressRes = res as any;
    return this.serverAdapter.getRouter()(expressRes.req, expressRes);
  }
}
