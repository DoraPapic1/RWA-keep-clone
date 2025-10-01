import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Tag } from '../tags/tag.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;
  @Column('text') content: string;
  @Column({ default: '#ffffff' }) color: string;

  @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE', nullable: true})
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.notes, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
