import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { User } from '../users/user.entity'
import { SignupDto } from './dtos/signup.dto'
import { LoginDto } from './dtos/login.dto'
import { BadRequestException } from '@nestjs/common'

describe('AuthController', () => {
  let authController: AuthController
  let authService: Partial<AuthService>

  beforeEach(async () => {
    const users: User[] = []
    authService = {
      registerUser: async (userInfo: SignupDto) => {
        const newUser = {
          id: Math.floor(Math.random() * 999999),
          username: userInfo.username,
          email: userInfo.email,
          phoneno: userInfo.phoneno,
        } as User
        users.push(newUser)
        return newUser
      },
      login: async (userInfo: LoginDto) => {
        if (
          users.find(
            (user) =>
              user.email === userInfo.emailOrUsername ||
              user.username === userInfo.emailOrUsername,
          )
        ) {
          return { accessToken: 'access_token' }
        }
        throw new BadRequestException()
      },
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile()

    authController = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  it('should signup successfully with new user and login with existing user', async () => {
    const user = await authController.signup({
      email: 'test@test.com',
      username: 'test',
      password: 'password',
      phoneno: '1342141',
    })
    const login = await authController.login({
      emailOrUsername: user.email,
      password: 'password',
    })
    expect(user).toBeDefined()
    expect(login).toBeDefined()
  })

  it('should throw expection if user not found in login', () => {
    expect(
      authController.login({
        emailOrUsername: 'email@email.com',
        password: 'password',
      }),
    ).rejects.toThrow(BadRequestException)
  })
})
