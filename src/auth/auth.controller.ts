<<<<<<< HEAD
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminSignInDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './auth.gaurd.';



=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
>>>>>>> 29c5f3bd09b6c52f26e131f40f765c956beade2b


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

<<<<<<< HEAD
  @Public()
  @Post('signin')

  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
  @Public()
=======
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

>>>>>>> 29c5f3bd09b6c52f26e131f40f765c956beade2b
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
<<<<<<< HEAD


  @Public()
  @Post('adminsignin')
  adminSignIn(@Body() adminSignInDto: AdminSignInDto) {
    return this.authService.adminSignIn(adminSignInDto);
  }

  

=======
  
>>>>>>> 29c5f3bd09b6c52f26e131f40f765c956beade2b
}
