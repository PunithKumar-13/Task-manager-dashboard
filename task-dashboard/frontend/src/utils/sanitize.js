export function sanitize(s) {
  if (!s) return '';
  return String(s).replace(/[<>]/g, '');
}
