import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdvertsModule } from './adverts/adverts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/nodepop.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    AdvertsModule,
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => [
        {
          rootPath: join(
            __dirname,
            '..',
            configService.get<string>('UPLOADS_FOLDER'),
          ),
          serveRoot: `/${configService.get<string>('PUBLIC_FOLDER')}`,
        },
      ],
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
