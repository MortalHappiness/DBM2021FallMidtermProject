import { createHash } from 'crypto';

function salt(p: string) {
  return `${p}__asdfghjkl`;
}

export function hashPassword(p: string) {
  const hash = createHash('sha512');
  hash.update(salt(p));
  return hash.digest('base64');
}