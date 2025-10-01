import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule }  from './auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UsersModule,
    NotesModule,
    TagsModule,
    AuthModule,
    
  ],
})
export class AppModule {}
