import {  Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { GroupEntity } from './entities/group.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';

/*It handles business logic and handles interaction with data source*/
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(GroupEntity)
        private readonly groupRepository: Repository<GroupEntity>,
        private readonly dataSource: DataSource
     ){}

    findAll(paginationQuery:PaginationQueryDto){
        const {limit,offset}= paginationQuery
        return this.userRepository.find({
            relations:['groups'],
            skip: offset,
            take: limit
        })
    }

    async recommendGroup(user: UserEntity){
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            user.recommendations++;
            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_group'
            recommendEvent.type = 'user'
            recommendEvent.payload = { userId: user.id }
            await queryRunner.manager.save(user)
            await queryRunner.manager.save(recommendEvent)
            await queryRunner.commitTransaction()
        }catch(error){
            await queryRunner.rollbackTransaction()
        }finally{
            await queryRunner.release()
        }

    }

    async findOne(id: string){
        // throw 'A random error'
        const user = await this.userRepository.findOne({where:{id:Number(id)},relations:['groups']})
        if(!user){
            // throw new HttpException(`user ${id} not found`,HttpStatus.NOT_FOUND)
            throw new NotFoundException(`user ${id} not found`)
        }
        return user 
    }

    async create(createUserDto: CreateUserDto){
        const groups = await Promise.all(createUserDto.groups.map(group=>this.preloadGroupByName(group)))
        const user =  this.userRepository.create({
            ...createUserDto,
            groups,
        })
        return await this.userRepository.save(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto){
        const groups = updateUserDto.groups && (await Promise.all(updateUserDto.groups.map(group=>this.preloadGroupByName(group))))
        const user = await this.userRepository.preload({
            id: +id,
            ...updateUserDto,
            groups,
        })
        if(!user){
            throw new NotFoundException(`Coffee #${id} is not found`)
        }
        return await this.userRepository.save(user)
    }

    async remove(id: string){
        const user = await this.findOne(id)
        return await this.userRepository.remove(user);
    }

    async preloadGroupByName(name: string){
        const exitingGroup = await this.groupRepository.findOne({where:{name}})
        if(exitingGroup){
            return exitingGroup
        }
        return this.groupRepository.create({name})
    }
}
