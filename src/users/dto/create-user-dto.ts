import { Optional } from "@nestjs/common";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    readonly email?: string;

    @IsString({each:true})
    readonly roles: string[];
}
