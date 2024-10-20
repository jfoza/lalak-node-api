function toCamelCase(snakeStr: string): string {
  return snakeStr.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', ''),
  );
}

export function mapKeysToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => mapKeysToCamelCase(item));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = toCamelCase(key);
      const value = obj[key];

      if (value instanceof Date) {
        result[camelKey] = value;
      } else {
        result[camelKey] = mapKeysToCamelCase(value);
      }
      return result;
    }, {} as any);
  }
  return obj;
}
