import { TokenValidator } from './auth/tokenValidator';
import { setupRoutes } from './routes/api';

const validator = new TokenValidator(process.env.AUTH_SECRET || 'dev-insecure-secret');
const routes = setupRoutes(validator);

export { validator, routes };
