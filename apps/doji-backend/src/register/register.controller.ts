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
        //check for validation of input data
        if(dto.username == undefined || dto.email == undefined || dto.display_name == undefined || dto.passwordHash == undefined){
            throw new HttpException('Incorrect data',HttpStatus.BAD_REQUEST);
        }
        //check for uniqueness of username and email
        const checkUser = await this.registerService.check(dto.username,dto.email);
        if(checkUser != undefined){
            if(dto.username == checkUser.username){
                throw new HttpException('this username is already used',HttpStatus.BAD_REQUEST);
            }
            else if(dto.email = checkUser.email){
                throw new HttpException('this email is already used',HttpStatus.BAD_REQUEST);
            }
            else if(dto.username == checkUser.username && dto.email == checkUser.email){
                throw new HttpException('this username and email is already used',HttpStatus.BAD_REQUEST);
            }else{
                throw new HttpException('unknown error occur',HttpStatus.BAD_REQUEST);
            }
        }
        //create new user and hash password
        const newUser = new User();
        newUser.username = dto.username;
        newUser.email = dto.email;
        newUser.display_name = dto.display_name;
        newUser.passwordHash = await bcrypt.hash(dto.passwordHash,10);
        this.registerService.creat(newUser);
        //add to database
        throw new HttpException('Successfully register',HttpStatus.CREATED);
        return;
    }
}
