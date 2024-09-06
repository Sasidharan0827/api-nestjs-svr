import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
<<<<<<< HEAD
import { JwtModule } from '@nestjs/jwt';
import { register } from 'module';
import { SignUpDto } from './auth/dto/auth.dto';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.gaurd.';
import { DoctorModule } from './doctor/doctor.module';
import { Doctor } from './doctor/entities/doctor.entity';
import { AppoinmentModule } from './appoinment/appoinment.module';
import { Appoinment } from './appoinment/entities/appoinment.entity';
import { ConsultationModule } from './consultation/consultation.module';
import { Consultation } from './consultation/entities/consultation.entity';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';




=======
import { AdminUsersModule } from './admin-users/admin-users.module';
import { DoctorsModule } from './doctors/doctors.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { AdminUser } from './admin-users/entities/admin-user.entity';
import { Doctor } from './doctors/entities/doctor.entity';
import { Consultation } from './consultations/entities/consultation.entity';
>>>>>>> 29c5f3bd09b6c52f26e131f40f765c956beade2b



@Module({
  imports:[TypeOrmModule.forRoot({  
    type: 'mysql',
    host:'localhost',
    port:3001,
    username:'admin',
    password:'admin123', 
    database:'xdb',
<<<<<<< HEAD
    entities: [User,Doctor,Appoinment,Consultation,Admin],
    synchronize:true,
    logging: true,    
  }), UsersModule,AuthModule,JwtModule.register({secret:'secret'},), DoctorModule, AppoinmentModule, ConsultationModule, AdminModule
=======
    entities: [User,AdminUser, Doctor, Consultation],
    synchronize:true,
    logging: true,    
  }), 
  AuthModule,
  UsersModule,
  AdminUsersModule,
  DoctorsModule,
  ConsultationsModule,
>>>>>>> 29c5f3bd09b6c52f26e131f40f765c956beade2b
 
],
controllers:[AppController],
providers:[AppService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },]
})
  
export class AppModule {}
