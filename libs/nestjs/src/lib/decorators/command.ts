/* eslint-disable @typescript-eslint/ban-types */
import { Post } from '@nestjs/common';

export function Command() {
  return function (target: object, key: string, descriptor: PropertyDescriptor) {
    // const original = descriptor.value;

    // descriptor.value = function (...body: any[]) {
    //   const result = original.apply(this, body);
    //   console.log('args', body);
    //   return result;
    // };

    // const types = Reflect.getMetadata('design:paramtypes', target, key);
    // console.log(s);
    Post(key)(target, key, descriptor);
  };
}
