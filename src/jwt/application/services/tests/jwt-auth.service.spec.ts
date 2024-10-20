import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JwtAuthService } from '../jwt-auth.service';
import { JwtService } from '@nestjs/jwt';
import { IJwtToken } from '@/jwt/domain/interfaces/jwt-token.interface';

vi.mock('node:process', () => ({
  env: { JWT_EXPIRATION: '3600' },
}));

describe('JwtAuthService', () => {
  let jwtAuthService: JwtAuthService;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = { sign: vi.fn() } as unknown as JwtService;
    jwtAuthService = new JwtAuthService();

    Reflect.set(jwtAuthService, 'jwtService', jwtService);
  });

  describe('authenticate', () => {
    it('should return a valid IJwtToken object', () => {
      const payload = { userId: '123' };
      const fakeToken = 'fake.jwt.token';

      vi.spyOn(jwtService, 'sign').mockReturnValue(fakeToken);

      const result: IJwtToken = jwtAuthService.authenticate(payload);

      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(result).toEqual({
        token: fakeToken,
        type: 'JWT',
        expiration: 3600,
      });
    });

    it('should correctly handle a Buffer payload', () => {
      const bufferPayload = Buffer.from('test payload');
      const fakeToken = 'buffer.jwt.token';

      vi.spyOn(jwtService, 'sign').mockReturnValue(fakeToken);

      const result: IJwtToken = jwtAuthService.authenticate(bufferPayload);

      expect(jwtService.sign).toHaveBeenCalledWith(bufferPayload);
      expect(result.token).toBe(fakeToken);
    });
  });
});
