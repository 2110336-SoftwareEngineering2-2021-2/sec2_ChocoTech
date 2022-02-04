import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/User';


@Injectable()
export class RegisterService {
    constructor(@InjectRepository(User) private readonly userRepo: EntityRepository<User>,){

    }
    async creat(user: User): Promise<User>{
        const creatUser = this.userRepo.create(user);
        await this.userRepo.persist(creatUser);
        return creatUser;
    }
    view(usn : string):Promise<User>{
        return this.userRepo.findOne({username: usn })
    }
}
