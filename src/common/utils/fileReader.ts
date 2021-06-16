export function readAsDataURL(blob: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      resolve((e.target?.result as string) || '');
    });
    reader.addEventListener('error', (e) => {
      reject(e);
    });
    reader.readAsDataURL(blob);
  });
}

export function readAsText(blob: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      resolve((e.target?.result as string) || '');
    });
    reader.addEventListener('error', (e) => {
      reject(e);
    });
    reader.readAsText(blob);
  });
}
