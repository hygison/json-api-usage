import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  testApi() {
    return this.appService.testApi();
  }
}
