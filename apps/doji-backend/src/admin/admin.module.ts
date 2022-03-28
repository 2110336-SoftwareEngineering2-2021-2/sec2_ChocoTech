import { AdminController } from '@backend/admin/admin.controller'
import { AdminService } from '@backend/admin/admin.service'
import { Admin } from '@backend/entities/Admin'
import { User } from '@backend/entities/User'
import { WorkHistory } from '@backend/entities/WorkHistory'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

@Module({
  imports: [MikroOrmModule.forFeature([Admin, User, WorkHistory])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
