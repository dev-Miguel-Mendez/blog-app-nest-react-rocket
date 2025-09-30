import { Module } from '@nestjs/common';
import { AppController } from './app.controller_DELETE';
import { AppService } from './app.service_DELETE';
import { EntriesModule } from './entries/entries.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [EntriesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
