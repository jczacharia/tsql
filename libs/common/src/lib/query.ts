export type IDomainModel<Props, Relations> = Props & Relations;

// export function createDomainModel<Props, Relations>(): IDomainModel<Props, Relations> {
//   return { ...props, ...relations };
// }

export type Query<T> = T extends IDomainModel<infer Props, infer Relations>
  ? (
      | { __all: true | undefined } // TODO Use [ALL]
      | {
          [K in keyof Props]?: true;
        }
    ) &
      {
        [K in keyof Relations]?: Relations[K] extends Array<infer A>
          ? ArrayQuery<T, A>
          : RelationQuery<T, Relations[K]>;
      }
  : never;

export type ArrayQuery<T, A> = [
  RelationQuery<T, A> & {
    // TODO Use [PAGINATE]
    __paginate?: {
      page: number;
      limit: number;
    };
  }
];

export type RelationQuery<T, R> = R extends IDomainModel<infer Props, infer Relations>
  ? Query<IDomainModel<Props, Pick<Relations, ProhibitAdjacentReferencedRelations<T, Relations>>>>
  : never;

type ProhibitAdjacentReferencedRelations<T, Relations> = {
  [K in keyof Relations]: Relations[K] extends Array<infer A>
    ? A extends T
      ? never
      : K
    : Relations[K] extends T
    ? never
    : K;
}[keyof Relations];
