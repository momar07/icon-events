import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from '../password';

describe('password utilities', () => {
  it('hashes a password', async () => {
    const hash = await hashPassword('TestPassword123');
    expect(hash).toBeTruthy();
    expect(hash).not.toBe('TestPassword123');
    expect(hash.startsWith('$2a$') || hash.startsWith('$2b$')).toBe(true);
  });

  it('hash length is 60', async () => {
    const hash = await hashPassword('TestPassword123');
    expect(hash.length).toBe(60);
  });

  it('verifies correct password', async () => {
    const hash = await hashPassword('MySecret99');
    const valid = await verifyPassword('MySecret99', hash);
    expect(valid).toBe(true);
  });

  it('rejects wrong password', async () => {
    const hash = await hashPassword('MySecret99');
    const valid = await verifyPassword('WrongPassword', hash);
    expect(valid).toBe(false);
  });

  it('generates different hashes for same password', async () => {
    const hash1 = await hashPassword('SamePass123');
    const hash2 = await hashPassword('SamePass123');
    expect(hash1).not.toBe(hash2);
  });
});
