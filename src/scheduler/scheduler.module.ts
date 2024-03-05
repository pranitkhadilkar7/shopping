import { Module } from '@nestjs/common'
import { SchedulerService } from './scheduler.service'
import { TokensModule } from '../tokens/tokens.module'

@Module({
  imports: [TokensModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
