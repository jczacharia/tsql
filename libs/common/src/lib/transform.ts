import { Query } from './query';
import { Repository } from 'typeorm';

// TODO put in @tsql/typeorm
// export function tsqlTransform<T>(entity: T, query: Query<T>) {
//   const arr: string[] = [];

//   const removeNextToLast = (str: string) => {
//     const chars: number[] = [];
//     for (let i = 0; i < str.length; i++) {
//       if (str.charAt(i) === '.') {
//         chars.push(i);
//       }
//     }
//     const index = chars[chars.length - 2];
//     return str.substring(index + 1);
//   };

//   const concat = (k: string, n: number) => {
//     let str = '';
//     if (n > 1) str += `${arr[arr.length - 1]}.`;
//     str += k;
//     str = removeNextToLast(str);
//     arr.push(str);
//   };

//   let n = 0;
//   const parse = <T>(q: Query<T>) => {
//     n++;
//     for (const k in q) {
//       if (typeof q[k] === 'object') {
//         concat(k, n);
//         parse(q[k]);
//         n--;
//         // TODO === true
//       } else if (q[k] === true) {
//         concat(k, n);
//       }
//     }
//   };

//   parse(query);

//   return arr;
// }

export async function findOne<T>(id: string, repo: Repository<T>, query: Query<T>) {
  const relations = createTypeormRelationsArray(query);
  const entity = await repo.findOne(id, { relations });
  return removeExtraFields(entity, query);
}

function removeExtraFields<T>(fullEntity: T, query: Query<T>) {
  const queryKeys = Object.keys(query);
  for (const key of Object.keys(fullEntity)) {
    if (!queryKeys.includes(key)) {
      delete fullEntity[key as keyof T];
    }
  }
  return fullEntity;
}

function createTypeormRelationsArray<T>(query: Query<T>) {
  const arr: string[] = [];

  const removeNextToLast = (str: string) => {
    const chars: number[] = [];
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) === '.') {
        chars.push(i);
      }
    }
    const index = chars[chars.length - 2];
    return str.substring(index + 1);
  };

  const concat = (k: string, n: number) => {
    let str = '';
    if (n > 1) str += `${arr[arr.length - 1]}.`;
    str += k;
    str = removeNextToLast(str);
    arr.push(str);
  };

  let n = 0;
  const parse = <T>(q: Query<T>) => {
    n++;
    for (const k in q) {
      if (typeof q[k] === 'object') {
        concat(k, n);
        parse(q[k]);
        n--;
      }
    }
  };

  parse(query);

  return arr;
}
