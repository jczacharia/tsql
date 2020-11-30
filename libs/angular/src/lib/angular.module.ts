import { CommonModule } from '@angular/common';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IOperation, IOperations, Parser, Query } from '@tsql/common';
import 'reflect-metadata';
import { TSQL_API_URL } from './tokens';

export let http: HttpClient;

@NgModule({
  imports: [CommonModule],
})
export class TSQLAngularModule {
  static forRoot({
    apiUrl,
    operations,
  }: {
    apiUrl: string;
    operations: IOperations;
  }): ModuleWithProviders<TSQLAngularModule> {
    return {
      ngModule: TSQLAngularModule,
      providers: [
        {
          provide: operations,
          useValue: createOperations(apiUrl, operations),
        },
      ],
    };
  }
}

function createOperations(apiUrl: string, operations: IOperations) {
  const http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const o = (operations as any).prototype['__tsql_operations'];
  for (const k of Object.keys(o)) {
    o[k] = <T, Q extends Query<T>, Props>(props: Props, query: Q) => {
      const body: IOperation<Props, T> = { name: k, props, query };
      return http.post<Parser<T, Q>>(`${apiUrl}/tsql/${k}`, body);
    };
  }
  return o;
}
