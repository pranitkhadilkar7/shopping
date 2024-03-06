import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { TokensService } from '../tokens/tokens.service'

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name)
  constructor(private tokensService: TokensService) {}

  @Cron('* 1 * * * *')
  async deleteExpitedTokensFromVerificationTokensTable() {
    this.logger.log(
      'Starting deletion of expired token from verfication_tokens table',
    )
    const deleteResult = await this.tokensService.deleteExpiredToken()
    this.logger.log(
      `Completed deletion of expired token from verfication_tokens table, Deleted ${deleteResult.affected} rows`,
    )
  }
}
