import { DecayNever } from '@tsql/util';
import { ALL, PAGINATE } from './constants';
import { ArrayQuery, RelationQuery } from './query';

export type Parser<CompleteType, QueriedType> = DecayNever<
  {
    [K in keyof CompleteType]: K extends keyof QueriedType
      ? QueriedType[K] extends ArrayQuery<CompleteType, QueriedType>
        ? Parser<CompleteType[K], Omit<QueriedType[K], typeof PAGINATE | typeof ALL>>
        : QueriedType[K] extends RelationQuery<unknown, unknown>
        ? Parser<CompleteType[K], QueriedType[K]>
        : QueriedType[K] extends true
        ? CompleteType[K]
        : never
      : QueriedType extends { __all: true } // TODO User [ALL]
      ? CompleteType[K]
      : never;
  }
>;
