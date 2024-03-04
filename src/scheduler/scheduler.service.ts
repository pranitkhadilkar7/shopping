import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name)

  //   @Cron('* * * * * *')
  //   handleCron() {
  //     this.logger.log('This cron job executed every second!!!')
  //   }
}
