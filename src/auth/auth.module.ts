import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
<<<<<<< HEAD
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.gaurd.';
import { AdminModule } from 'src/admin/admin.module';
import { AdminService } from 'src/admin/admin.service';


@Module({
  imports:[UsersModule, AdminModule,JwtModule.register({
    secret: 'secret', 
    global: true})
   
  ],
    
 
  
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, 
    Reflector,
   

  ],
  exports:[AuthService]

=======

@Module({
  imports:[UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
>>>>>>> 29c5f3bd09b6c52f26e131f40f765c956beade2b
})
export class AuthModule {}
