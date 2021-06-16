function classNames(...args: any): string {
  const classes = args
    .reduce((result: string[], current: any) => {
      if (!current) return result;
      if (typeof current === 'string') return [...result, current];
      const keys = Object.keys(current);
      const values = keys.map((row) => current[row]);
      return [...result, classNames(...values)];
    }, [])
    .filter((e: string) => e);
  return classes.join(' ');
}

export default classNames;
