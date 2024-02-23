import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/user.entity'
import { BadRequestException } from '@nestjs/common'

describe('AuthService', () => {
  let authService: AuthService
  let usersService: Partial<UsersService>
  let jwtService: Partial<JwtService>

  beforeEach(async () => {
    const users: User[] = []
    usersService = {
      findByEmailOrUsername: async (email: string, username: string) =>
        users.find(
          (user) => user.email === email || user.username === username,
        ),
      saveWithRole: async (user: Partial<User>) => {
        const newUser = {
          id: Math.floor(Math.random() * 999999),
          ...user,
          roles: [],
        } as User
        users.push(newUser)
        return newUser
      },
    }
    jwtService = {
      signAsync: async () => 'JWT_ACCESS_TOKE',
    }

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile()

    authService = moduleRef.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  it('should create new user with hashed password', async () => {
    const user = await authService.registerUser({
      email: 'test@test.com',
      username: 'test',
      password: 'password',
      phoneno: '1234567890',
    })
    expect(user.password).not.toEqual('password')
    expect(user).toBeDefined()
  })

  it('should throw an error for signup of existing user', async () => {
    const user = await authService.registerUser({
      email: 'test@test.com',
      username: 'test',
      password: 'password',
      phoneno: '1234567890',
    })
    expect(
      authService.registerUser({
        email: user.email,
        username: user.username,
        password: '',
        phoneno: '',
      }),
    ).rejects.toThrow(BadRequestException)
  })

  it('should login successfully for existing user', async () => {
    const user = await authService.registerUser({
      email: 'test@test.com',
      username: 'test',
      password: 'password',
      phoneno: '1234567890',
    })
    const loginData = await authService.login({
      emailOrUsername: user.email,
      password: 'password',
    })
    expect(loginData.accessToken).toBeDefined()
  })

  it('should throw exeption for login of unregistered user', async () => {
    expect(
      authService.login({ emailOrUsername: 'e', password: 'p' }),
    ).rejects.toThrow(BadRequestException)
  })

  it('should throw exeption for login of with invalid password', async () => {
    const user = await authService.registerUser({
      email: 'test@test.com',
      username: 'test',
      password: 'password',
      phoneno: '1234567890',
    })
    expect(
      authService.login({ emailOrUsername: user.username, password: 'p' }),
    ).rejects.toThrow(BadRequestException)
  })
})
