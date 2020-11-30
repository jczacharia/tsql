import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TSQLNestModule } from '@tsql/nestjs';
import { AppController } from './app.controller';
import { DbModule } from './db.module';
import { UserPrivateEntity } from './entities/user-private.entity';
import { JobPostRepository } from './repositories/job-post.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    TSQLNestModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '1Qazxsw2',
      database: 'tsql',
      synchronize: true,
      autoLoadEntities: true,
      ssl: false,
    }),
    DbModule
  ],
  controllers: [AppController],
  providers: [UserRepository, UserPrivateEntity, JobPostRepository],
})
export class AppModule {}
