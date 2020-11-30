import { IAngularCommunication, Operation } from '@tsql/angular';
import { ClientOperation } from '@tsql/common';
import { AddJobPostDto, ExampleAppOperations, GetJobPostDto, JobPost } from '@tsql/example-lib';

export class ApiFacadeService implements IAngularCommunication<ExampleAppOperations> {
  @Operation()
  getJobPost!: ClientOperation<GetJobPostDto, JobPost>;

  @Operation()
  addJobPost!: ClientOperation<AddJobPostDto, JobPost>;
}
