import { Optional } from "@nestjs/common";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { GroupEntity } from "../entities/group.entity";

export class CreateUserDto {
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    readonly email?: string;

    @IsString({each:true})
    readonly groups: string[];
}
