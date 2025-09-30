import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EntriesService {
  constructor(private prisma: PrismaService) {}

  create(data: { title: string; author: string; content: string }) {
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
          { title: { contains: query } },
          { author: { contains: query } },
          { content: { contains: query } },
        ],
      },
    });
  }

  findOne(id: number) {
    return this.prisma.entry.findUnique({ where: { id } });
  }
}
