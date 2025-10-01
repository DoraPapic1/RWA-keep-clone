// backend/src/notes/notes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
    private readonly tagsService: TagsService,
  ) {}

  async findAll(userId?: number, search?: string, tagId?: number) {
    const qb = this.noteRepo
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.tags', 'tag');

    if (userId !== undefined) {
      qb.andWhere('note.userId = :userId', { userId });
    }
    if (search && search.trim()) {
      const q = `%${search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(note.title) LIKE :q OR LOWER(note.content) LIKE :q)',
        { q },
      );
    }
    if (tagId !== undefined) {
      qb.andWhere('tag.id = :tagId', { tagId });
    }

    return qb.getMany();
  }

  async findOne(id: number, userId?: number) {
    const note = await this.noteRepo.findOne({
      where: userId !== undefined ? { id, user: { id: userId } as any } : { id },
      relations: ['tags', 'user'],
    });
    if (!note) throw new NotFoundException(`Note ${id} not found`);
    return note;
  }

  async create(dto: CreateNoteDto, userId?: number) {
    const tags = dto.tagIds?.length ? await this.tagsService.findByIds(dto.tagIds) : [];
    const note = this.noteRepo.create({
      title: dto.title,
      content: dto.content ?? '',
      color: dto.color ?? '#ffffff',
      tags,
      ...(userId ? { user: { id: userId } as any } : {}),
    });
    return this.noteRepo.save(note);
  }

  async update(id: number, dto: UpdateNoteDto, userId?: number) {
    const note = await this.findOne(id, userId);

    if (dto.title !== undefined) note.title = dto.title;
    if (dto.content !== undefined) note.content = dto.content;
    if (dto.color !== undefined) note.color = dto.color;

    if (dto.tagIds) {
      note.tags = dto.tagIds.length ? await this.tagsService.findByIds(dto.tagIds) : [];
    }

    return this.noteRepo.save(note);
  }

  async remove(id: number, userId?: number) {
    const note = await this.findOne(id, userId);
    await this.noteRepo.remove(note);
    return { deleted: true };
  }
}
