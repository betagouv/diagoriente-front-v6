export function graphQLResult<K extends string, T>(data: { [Key in K]: T }): T {
  const keys = Object.keys(data);
  return (data as any)[keys[0]];
}
