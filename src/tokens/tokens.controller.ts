import { Body, Controller, Post } from '@nestjs/common'
import { Roles } from '../common/decorators/roles.decorator'
import { UserRole } from '../roles/role.enum'
import { UserRegistrationInviteDto } from './dtos/user-registration-invite.dto'
import { ConsumerInviteDto } from './dtos/consumer-invite.dto'
import { User } from '../common/decorators/user.decorator'
import { TokensService } from './tokens.service'

@Controller('tokens')
export class TokensController {
  constructor(private tokensService: TokensService) {}
  @Roles(UserRole.ADMIN)
  @Post('user-registration-invite')
  createRegistrationToken(
    @Body() userRegistrationInviteDto: UserRegistrationInviteDto,
    @User('userId') creatorId: number,
  ) {
    return this.tokensService.createAndsaveRegistrationToken(
      userRegistrationInviteDto.email,
      userRegistrationInviteDto.userRole,
      creatorId,
    )
  }

  @Roles(UserRole.MERCHANT)
  @Post('consumer-invite')
  createUserInviteToken(@Body() consumerInviteDto: ConsumerInviteDto) {
    return consumerInviteDto
  }
}
