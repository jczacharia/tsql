import { IOperation, IOperations, ClientOperation } from '@tsql/common';

export * from './lib/angular.module';
export * from './lib/decorators';
export * from './lib/commander-gateway.service';

export type IAngularCommunication<T extends IOperations> = {
  [K in keyof T]: T[K] extends IOperation<infer Props, infer T> ? ClientOperation<Props, T> : never;
};
