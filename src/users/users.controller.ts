import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
    constructor(private readonly useService: UsersService){}
    @Get()
    findAll(@Query() paginationQuery){
        // const {offset, limit} = paginationQuery;
        return this.useService.findAll()
    }

    @Get('employees')
    findAllEmployees(){
       return this.useService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.useService.findOne(id)
    }

    @Post()
    // @HttpCode(HttpStatus.GONE)
    createUser(@Body() createUserDto: CreateUserDto){
        console.log(createUserDto instanceof CreateUserDto) // false
        // createUserDto is in shape of CreateUserDto but not instance of it.
        return this.useService.create(createUserDto);
    }

    @Patch(":id")
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
        return this.useService.update(id, updateUserDto)
    }

    @Delete(":id")
    remove(@Param("id") id: string){
        return this.useService.remove(id)
    }

}
