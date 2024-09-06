import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
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

})
export class AuthModule {}
