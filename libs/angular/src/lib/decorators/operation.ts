export function Operation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any, key: string) {
    const operations = target['__tsql_operations'];
    if (!operations) {
      target['__tsql_operations'] = {};
    }
    target['__tsql_operations'][key] = '__tsql_operations_placeholder';
  };
}
