import { Body, Controller, Post } from '@nestjs/common';
import { IOperation, Parser, Query } from '@tsql/common';
import { AddJobPostDto, GetJobPostDto, ExampleAppOperations, JobPost } from '@tsql/example-lib';
import { Command, INestCommunication } from '@tsql/nestjs';
import { JobPostRepository } from './repositories/job-post.repository';

@Controller('tsql')
export class AppController implements INestCommunication<ExampleAppOperations> {
  constructor(private readonly jobPostRepo: JobPostRepository) {}

  @Command()
  async getJobPost<Q extends Query<JobPost>>(@Body() body: IOperation<GetJobPostDto, JobPost>) {
    const entity = await this.jobPostRepo.findOne(body.props.id, body.query);
    return (entity as unknown) as Parser<JobPost, Q>;
  }

  @Post('addJobPost')
  async addJobPost<Q extends Query<JobPost>>(@Body() body: IOperation<AddJobPostDto, JobPost>) {
    console.log(body);
    return (body as unknown) as Parser<JobPost, Q>;
  }
}
