import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

import { JwtModule } from '@nestjs/jwt';
// import { register } from 'module';
// import { SignUpDto } from './auth/dto/auth.dto';
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
import { UploadImagesModule } from './upload-images/upload-images.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function buildDatabaseConfig(configService: ConfigService): TypeOrmModuleOptions {
  const databaseUrl = configService.get<string>('DATABASE_URL');
  const explicitSslMode =
    configService.get<string>('DB_SSL') ??
    configService.get<string>('DATABASE_SSL') ??
    configService.get<string>('PGSSLMODE');

  const shouldUseSsl = (sslMode?: string | null): boolean =>
    ['true', '1', 'require', 'prefer'].includes(
      (sslMode ?? 'false').toLowerCase(),
    );

  const baseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    entities: [User, Doctor, Appoinment, Consultation, Admin],
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  };

  if (databaseUrl) {
    const parsedUrl = new URL(databaseUrl);
    const password = decodeURIComponent(parsedUrl.password ?? '');
    const urlSslMode =
      parsedUrl.searchParams.get('sslmode') ??
      parsedUrl.searchParams.get('ssl');
    const useSsl =
      shouldUseSsl(explicitSslMode) ||
      shouldUseSsl(urlSslMode) ||
      parsedUrl.hostname.endsWith('.neon.tech');

    if (!password) {
      throw new Error(
        'Invalid DATABASE_URL: the connection string is missing a database password.',
      );
    }

    return {
      ...baseConfig,
      url: databaseUrl,
      ssl: useSsl ? { rejectUnauthorized: false } : false,
    };
  }

  const host = configService.get<string>('DB_HOST');
  const port = Number(configService.get<string>('DB_PORT') ?? '5432');
  const username =
    configService.get<string>('DB_USERNAME') ??
    configService.get<string>('DB_USER');
  const password = configService.get<string>('DB_PASSWORD');
  const database = configService.get<string>('DB_NAME');

  if (!host || !username || typeof password !== 'string' || !database) {
    throw new Error(
      'Database configuration is incomplete. Set DATABASE_URL with a password, or provide DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, and DB_NAME.',
    );
  }

  return {
    ...baseConfig,
    host,
    port,
    username,
    password,
    database,
    ssl: shouldUseSsl(explicitSslMode) ? { rejectUnauthorized: false } : false,
  };
}
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'src/Firebase/.env'],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        buildDatabaseConfig(configService),
    }),
    UsersModule,
    AuthModule,
    JwtModule.register({ secret: 'secret' }),
    DoctorModule,
    AppoinmentModule,
    ConsultationModule,
    AdminModule,
    UploadImagesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
