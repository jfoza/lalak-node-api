import { describe, it, expect, vi } from 'vitest';
import { JwtAuthService } from '../jwt-auth.service';
import { IJwtToken } from '@/jwt/domain/interfaces/jwt-token.interface';

vi.mock('node:process', () => ({
  env: { JWT_EXPIRATION: '3600' },
}));

describe('JwtAuthService', () => {
  let sut: JwtAuthService;

  describe('authenticate', () => {
    it('should return a valid IJwtToken object', () => {
      const payload = { userId: '123' };
      const fakeToken = 'fake.jwt.token';

      vi.spyOn(sut, 'sign').mockReturnValue(fakeToken);

      const result: IJwtToken = sut.authenticate(payload);

      expect(sut.sign).toHaveBeenCalledWith(payload);
      expect(result).toEqual({
        token: fakeToken,
        type: 'JWT',
        expiration: 3600,
      });
    });

    it('should correctly handle a Buffer payload', () => {
      const bufferPayload = Buffer.from('test payload');
      const fakeToken = 'buffer.jwt.token';

      vi.spyOn(sut, 'sign').mockReturnValue(fakeToken);

      const result: IJwtToken = sut.authenticate(bufferPayload);

      expect(sut.sign).toHaveBeenCalledWith(bufferPayload);
      expect(result.token).toBe(fakeToken);
    });
  });
});
