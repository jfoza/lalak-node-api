import { Controller, Get } from '@nestjs/common';

type TWelcome = {
  message: string;
  status: string;
};

@Controller()
export class AppController {
  @Get()
  index(): TWelcome {
    return {
      message: 'Welcome!',
      status: 'Ok',
    } as TWelcome;
  }
}
