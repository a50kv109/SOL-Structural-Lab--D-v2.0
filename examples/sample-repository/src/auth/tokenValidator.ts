import { TokenValidationResult } from './types';

export class TokenValidator {
  private secretKey: string;

  constructor(secretKey: string) {
    if (!secretKey) {
      throw new Error('Secret key is required');
    }
    this.secretKey = secretKey;
  }

  public validateBearerHeader(authHeader?: string): TokenValidationResult {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { valid: false, error: 'Missing or malformed Authorization header' };
    }

    const token = authHeader.slice(7).trim();
    if (token.length < 10) {
      return { valid: false, error: 'Token string too short' };
    }

    // Simulated token payload parsing
    return {
      valid: true,
      user: {
        id: 'usr_sample_123',
        role: 'user',
        scopes: ['read:profile'],
      },
    };
  }
}
