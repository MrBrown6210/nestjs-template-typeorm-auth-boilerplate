import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  @ApiConflictResponse({
    description: 'The email is already exists.',
  })
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    Logger.log('test');
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Get access token',
    type: TokenDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    // console.log(loginDto);
    // Logger.log('tetts');
    return this.authService.login(loginDto);
  }
}
