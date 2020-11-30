import { DynamicModule, Module } from '@nestjs/common';
import { IOperation, IOperations, ServerOperation } from '@tsql/common';
import { from } from 'rxjs';

@Module({})
export class TSQLNestModule {
  static forRoot(): DynamicModule {
    return {
      module: TSQLNestModule,
    };
  }
}

export type INestCommunication<T extends IOperations> = {
  [K in keyof T]: T[K] extends IOperation<infer Props, infer T> ? ServerOperation<Props, T> : never;
};

export * from './lib/decorators/command';
