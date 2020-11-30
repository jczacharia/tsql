import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IOperation, Parser, Query } from '@tsql/common';
import { TSQL_API_URL } from './tokens';

/* eslint-disable @typescript-eslint/ban-types */

@Injectable()
export class TSQLCommanderGatewayService {
  constructor(private readonly http: HttpClient, @Inject(TSQL_API_URL) private readonly apiUrl: string) {}

  operation<T, Q extends Query<T>>(command: string, props: object, query: Q) {
    const body: IOperation<object, T> = { name: command, props, query };
    return this.http.post<Parser<T, Q>>(`${this.apiUrl}/tsql/${command}`, body);
  }
}
