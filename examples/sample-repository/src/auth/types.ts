export interface AuthUser {
  id: string;
  role: 'admin' | 'user' | 'service';
  scopes: string[];
}

export interface TokenValidationResult {
  valid: boolean;
  user?: AuthUser;
  error?: string;
}
