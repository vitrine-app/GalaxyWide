import { cleanEnv, port } from 'envalid';

export default cleanEnv(process.env, {
  RENDERER_PORT: port({ default: 8888 }),
});
