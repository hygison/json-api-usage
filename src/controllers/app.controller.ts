import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/services/app.service';
import { Transaction } from 'typeorm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  testApi() {
    return this.appService.testApi();
  }
}
