import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from 'src/entities/User';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports:[MikroOrmModule.forFeature([User])],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService]
})
export class RegisterModule {}
