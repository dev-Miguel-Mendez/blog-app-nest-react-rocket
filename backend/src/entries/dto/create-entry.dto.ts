import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreateEntrySchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  content: z.string().min(1),
  //%  Date is automatically created by Prisma
});

//* Converting schema into a DTO class
export class CreateEntryDto extends createZodDto(CreateEntrySchema) {}
