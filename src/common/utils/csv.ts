export function jsonToCSV(json: { [key: string]: any }[]) {
  // specify how you want to handle null values here
  const replacer = (key: string, value: any) => (value === null ? '' : value);
  const header = Object.keys(json[0]);
  const csv = json.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(header.join(','));
  return csv.join('\r\n');
}

export function downloadCSV(csv: string, name: string) {
  const uri = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;

  const link = document.createElement('a');
  link.setAttribute('href', uri);
  link.setAttribute('download', `${name}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
