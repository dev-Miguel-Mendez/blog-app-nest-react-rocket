import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';

@Controller('entries')
export class EntriesController {

    constructor(private readonly entriesService: EntriesService){}
    
    @Post() //$ POST localhost:8001/entries
                //* Adding extra validation pipe
    createEntry(@Body() CreateEntryDto: CreateEntryDto){
        return this.entriesService.create(CreateEntryDto)
    }

    //* Search or get all
   
    @Get()  //$ GET entries?q=query
    findAllEntries(@Query('q') query?: string){
        if(query) return this.entriesService.search(query)

        return this.entriesService.findAll()
    }

    
    @Get(":id") //$ GET entries/:id
    findOneEntry(@Param("id") id: number){
        return this.entriesService.findOne(Number(id))
    }
    
}
