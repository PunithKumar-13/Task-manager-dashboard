export function sanitize(input = '') {
    return String(input).replace(/<[^>]*>?/gm, '').trim();
}
