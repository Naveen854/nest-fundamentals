import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { GroupEntity } from './entities/group.entity';
import { Event } from '../events/entities/event.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity,GroupEntity,Event])
    ],
    controllers: [
        UsersController
    ],
    providers:[UsersService]
})
export class UsersModule {}
 