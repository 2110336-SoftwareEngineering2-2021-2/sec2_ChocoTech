import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { User } from 'src/entities/User';
import { RegisterService } from './register.service';
import bcrypt from 'bcrypt'

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService){
    }
    @Post()
    async creat(@Body() dto: Omit<User,'id'|'coin_balance'|'online_status'|'registeration_date'>){
        if(dto.username == undefined || dto.email == undefined || dto.display_name == undefined || dto.passwordHash == undefined){
            throw new HttpException('Incorrect data',HttpStatus.BAD_REQUEST);
        }
        const newUser = new User();
        newUser.username = dto.username;
        newUser.email = dto.email;
        newUser.display_name = dto.display_name;
        newUser.passwordHash = await bcrypt.hash(dto.passwordHash,10);
        return this.registerService.creat(newUser);
    }
    @Get(':view')
    view(@(Param('view')) username: string){
        return this.registerService.view(username);
    }
}
