import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { DoctorsModule } from './doctors/doctors.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { AdminUser } from './admin-users/entities/admin-user.entity';
import { Doctor } from './doctors/entities/doctor.entity';
import { Consultation } from './consultations/entities/consultation.entity';



@Module({
  imports:[TypeOrmModule.forRoot({  
    type: 'mysql',
    host:'localhost',
    port:3001,
    username:'admin',
    password:'admin123', 
    database:'xdb',
    entities: [User,AdminUser, Doctor, Consultation],
    synchronize:true,
    logging: true,    
  }), 
  AuthModule,
  UsersModule,
  AdminUsersModule,
  DoctorsModule,
  ConsultationsModule,
 
],
controllers:[AppController],
providers:[AppService],
})
  
export class AppModule {}
