import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

/*It handles business logic and handles interaction with data source*/
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}
    findAll(){
        return this.userRepository.find()
    }

    async findOne(id: string){
        // throw 'A random error'
        const user = await this.userRepository.findOne({where:{id:Number(id)}})
        if(!user){
            // throw new HttpException(`user ${id} not found`,HttpStatus.NOT_FOUND)
            throw new NotFoundException(`user ${id} not found`)
        }
        return user 
    }

    async create(createUserDto: CreateUserDto){
        const user =  this.userRepository.create(createUserDto)
        return await this.userRepository.save(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto){
        const user = await this.userRepository.preload({
            id: +id,
            ...updateUserDto
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
}
