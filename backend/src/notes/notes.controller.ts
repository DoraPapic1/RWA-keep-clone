import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, Request, ParseIntPipe
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('api/notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  findAll(
    @Request() req,
    @Query('search') search?: string,
    @Query('tagId', ParseIntPipe) tagId?: number,
  ) {
    
    const userId = req?.user?.id ?? undefined;
    return this.notesService.findAll(userId, search, tagId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req?.user?.id ?? undefined;
    return this.notesService.findOne(id, userId);
  }

  @Post()
  create(@Body() dto: CreateNoteDto, @Request() req) {
    const userId = req?.user?.id ?? undefined;
    return this.notesService.create(dto, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNoteDto,
    @Request() req,
  ) {
    const userId = req?.user?.id ?? undefined;
    return this.notesService.update(id, dto, userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req?.user?.id ?? undefined;
    return this.notesService.remove(id, userId);
  }
}
