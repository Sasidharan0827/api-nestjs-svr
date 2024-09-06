import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminSignInDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './auth.gaurd.';





@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')

  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }


  @Public()
  @Post('adminsignin')
  adminSignIn(@Body() adminSignInDto: AdminSignInDto) {
    return this.authService.adminSignIn(adminSignInDto);
  }

  

}
