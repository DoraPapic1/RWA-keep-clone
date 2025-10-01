import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService implements OnModuleInit{
  constructor(
    @InjectRepository(Tag)
    private tagsRepo: Repository<Tag>,
  ) {}
  async onModuleInit() {
    const count = await this.tagsRepo.count();
    if (count === 0) {
      await this.tagsRepo.save([
        this.tagsRepo.create({ name: 'Osobno', color: '#6aa9ff' }),
        this.tagsRepo.create({ name: 'Posao',     color: '#82e0aa' }),
        this.tagsRepo.create({ name: 'Faks',   color: '#f7dc6f' }),
      ]);
    }
  }
  async findAll(): Promise<Tag[]> {
    return this.tagsRepo.find();
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagsRepo.findOne({ where: { id } });
    if (!tag) throw new NotFoundException(`Tag with ID ${id} not found`);
    return tag;
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagsRepo.create(createTagDto);
    return this.tagsRepo.save(tag);
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOne(id);
    Object.assign(tag, updateTagDto);
    return this.tagsRepo.save(tag);
  }

  async remove(id: number): Promise<void> {
    const tag = await this.findOne(id);
    await this.tagsRepo.remove(tag);
  }

  async findByIds(ids: number[]): Promise<Tag[]> {
    if (!ids || !ids.length) return [];
    return this.tagsRepo.find({ where: { id: In(ids) } });
  }
}
