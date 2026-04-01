import { Logger, Module } from '@nestjs/common';
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

const databaseConfigLogger = new Logger('DatabaseConfig');

function buildDatabaseConfig(configService: ConfigService): TypeOrmModuleOptions {
  const databaseUrl =
    configService.get<string>('DATABASE_INTERNAL_URL') ??
    configService.get<string>('DATABASE_URL') ??
    configService.get<string>('DATABASE_PUBLIC_URL');
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

    databaseConfigLogger.log(
      `Using postgres connection URL from ${
        configService.get<string>('DATABASE_INTERNAL_URL')
          ? 'DATABASE_INTERNAL_URL'
          : configService.get<string>('DATABASE_URL')
            ? 'DATABASE_URL'
            : 'DATABASE_PUBLIC_URL'
      } (${parsedUrl.hostname}:${parsedUrl.port || '5432'} / ${
        parsedUrl.pathname.slice(1) || 'postgres'
      })`,
    );

    return {
      ...baseConfig,
      url: databaseUrl,
      ssl: useSsl ? { rejectUnauthorized: false } : false,
    };
  }

  const host =
    configService.get<string>('DB_HOST') ??
    configService.get<string>('PGHOST');
  const port = Number(
    configService.get<string>('DB_PORT') ??
      configService.get<string>('PGPORT') ??
      '5432',
  );
  const username =
    configService.get<string>('DB_USERNAME') ??
    configService.get<string>('DB_USER') ??
    configService.get<string>('PGUSER');
  const password =
    configService.get<string>('DB_PASSWORD') ??
    configService.get<string>('PGPASSWORD');
  const database =
    configService.get<string>('DB_NAME') ??
    configService.get<string>('PGDATABASE');

  if (!host || !username || typeof password !== 'string' || !database) {
    throw new Error(
      'Database configuration is incomplete. Set DATABASE_INTERNAL_URL or DATABASE_URL with a password, or provide DB_HOST/PGHOST, DB_PORT/PGPORT, DB_USERNAME/PGUSER, DB_PASSWORD/PGPASSWORD, and DB_NAME/PGDATABASE.',
    );
  }

  databaseConfigLogger.log(
    `Using postgres connection fields (${host}:${port} / ${database})`,
  );

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
