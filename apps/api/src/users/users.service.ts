import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepo.findOneOrFail({ where: { id } });
  }

  async update(id: string, data: Partial<User>) {
    await this.usersRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.usersRepo.remove(user);
    return user;
  }
}