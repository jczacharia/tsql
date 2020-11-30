import { IOperation } from '@tsql/common';
import { AddJobPostDto, GetJobPostDto } from './dtos';
import { JobPost } from './models';

export interface ExampleAppOperations {
  getJobPost: IOperation<GetJobPostDto, JobPost>;
  addJobPost: IOperation<AddJobPostDto, JobPost>;
}
