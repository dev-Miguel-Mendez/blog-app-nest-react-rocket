import { Module } from '@nestjs/common';
import { EntriesModule } from './entries/entries.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [EntriesModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
