import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

/*It handles business logic and handles interaction with data source*/
@Injectable()
export class UsersService {
    private users: UserEntity[] = [
        {
            id:1,
            name: "Naveen",
            email: "naveen@example.com",
            roles:["frontend developer","fullstack developer"]
        }
    ]
    findAll(){
        return this.users
    }

    findOne(id: string){
        // throw 'A random error'
        const user = this.users.find(user=>user.id.toString() == id)
        if(!user){
            // throw new HttpException(`user ${id} not found`,HttpStatus.NOT_FOUND)
            throw new NotFoundException(`user ${id} not found`)
        }
        return user 
    }

    create(createUserDto: any){
        this.users.push(createUserDto)
        return createUserDto;
    }

    update(id: string, updateUserDto: any){
        const user = this.findOne(id)
        // if(user){
        //     // update user
        // }else{

        // }
    }

    remove(id: string){
        const userIndex = this.users.findIndex(user=>user.id.toString() == id)
        if(userIndex >= 0){
            const deletedUser = this.users.splice(userIndex,1)
            return deletedUser[0]
        }else{

        }
    }
}
