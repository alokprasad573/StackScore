import { createRequestHandler } from '@react-router/serve';
import * as build from '../build/server/index.js'; // Adjust if needed

export default createRequestHandler({
  build,
  mode: 'production',
});