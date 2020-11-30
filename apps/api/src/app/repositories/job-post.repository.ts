import { InjectRepository } from '@nestjs/typeorm';
import { findOne, Query } from '@tsql/common';
import { Repository } from 'typeorm';
import { JobPostEntity } from '../entities/job-post.entity';

export class JobPostRepository {
  constructor(@InjectRepository(JobPostEntity) protected readonly jobPostRepo: Repository<JobPostEntity>) {}

  get repo() {
    return this.jobPostRepo;
  }

  findOne(id: string, query: Query<JobPostEntity>) {
    return findOne(id, this.jobPostRepo, query);
  }
}
