import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already in use');
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({ email: dto.email, password: hash });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
  return await this.usersRepo.findOne({ where: { email } });
}
  async findById(id: number): Promise<User | null> {
  return this.usersRepo.findOne({ where: { id } });
}
}
