import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserGuard } from './user.guard'
import { User } from '../common/decorators/user.decorator'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  findAll() {
    return this.usersService.findAll()
  }

  @UseGuards(UserGuard)
  @Post('create')
  create(@Body() createUserDto: CreateUserDto, @User('userId') userId: number) {
    return this.usersService.create(
      {
        email: createUserDto.email,
        username: createUserDto.username,
        password: createUserDto.password,
        phoneno: createUserDto.phoneno,
      },
      createUserDto.type,
      userId,
    )
  }
}
