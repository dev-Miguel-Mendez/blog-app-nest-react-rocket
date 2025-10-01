import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntryDto } from './dto/create-entry.dto';

@Injectable()
export class EntriesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEntryDto) {
    return this.prisma.entry.create({ data });
  }

  findAll() {
    return this.prisma.entry.findMany({
      orderBy: { date: 'desc' },
    });
  }

  search(query: string) {
    return this.prisma.entry.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { author: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }

  findOne(id: number) {
    return this.prisma.entry.findUnique({ where: { id } });
  }
}
