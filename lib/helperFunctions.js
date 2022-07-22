export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

export const formatToCurrency = (value, currency = 'GHS') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);

export const encode = (string = '') => btoa(encodeURIComponent(string));
export const decode = (string = '') => decodeURIComponent(atob(string));
