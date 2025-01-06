function toCamelCase(snakeStr: string): string {
  return snakeStr.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', ''),
  );
}

export function mapKeysToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(mapKeysToCamelCase);
  } else if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (result, key) => {
        const camelKey = toCamelCase(key);
        result[camelKey] = mapKeysToCamelCase(obj[key]);
        return result;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
}
