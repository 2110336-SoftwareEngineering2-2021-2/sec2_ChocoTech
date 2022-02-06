import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/User';


@Injectable()
export class RegisterService {
    constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>,){

    }
    // create user service
    async creat(user: User): Promise<User>{
        const creatUser = this.userRepo.create(user);
        this.userRepo.persistAndFlush(creatUser);
        return creatUser;
    }
    //check for user service
    check(usn : string,em : string):Promise<User>{
        return this.userRepo.findOne({$or:[{username:usn},{email:em}]});
    }
}
