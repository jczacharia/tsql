import { PromiseOrObservable } from '@tsql/util';
import { Parser } from './parser';
import { Query } from './query';

export interface IOperation<Props, T> {
  name: string;
  props: Props;
  query: Query<T>;
}

export type IOperations = Record<keyof unknown, IOperation<unknown, unknown>>;

export type ServerOperation<Props, T> = <Q extends Query<T>>(
  request: IOperation<Props, T>
) => PromiseOrObservable<Parser<T, Q>>;

export type ClientOperation<Props, T> = <Q extends Query<T>>(
  props: Props,
  query: Q
) => PromiseOrObservable<Parser<T, Q>>;

// eslint-disable-next-line @typescript-eslint/ban-types
// export function createOperation<T, Props>(name: string, props: Props): IOperation<Props, T> {
//   return { name, props, query: {} as Query<T> };
// }
