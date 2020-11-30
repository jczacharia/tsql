import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UserRepository {
  constructor(@InjectRepository(UserEntity) protected readonly creditRepo: Repository<UserEntity>) {}

  get repo() {
    return this.creditRepo;
  }
}
