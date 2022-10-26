import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  SignupResponse,
} from './auth.types';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: set-cookie header w/ token
  @Post('login')
  login(@Body() body: LoginData): Promise<LoginResponse> {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Post('signup')
  signup(@Body() body: RegisterData): Promise<SignupResponse> {
    return this.authService.signup(body);
  }
}
