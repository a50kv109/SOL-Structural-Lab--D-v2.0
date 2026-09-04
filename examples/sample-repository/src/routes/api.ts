import { TokenValidator } from '../auth/tokenValidator';

export function setupRoutes(validator: TokenValidator) {
  return {
    handleProtectedRequest: (headers: Record<string, string>) => {
      const result = validator.validateBearerHeader(headers['authorization']);
      if (!result.valid) {
        return { status: 401, body: { error: result.error } };
      }
      return { status: 200, body: { message: 'Access granted', user: result.user } };
    },
  };
}
