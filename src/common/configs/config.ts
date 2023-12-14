import 'dotenv/config';
import { get } from 'env-var';
import ms from 'ms';

export const backendServer = {
  host: get('BACKEND_HOST').default('localhost').asString(),
  port: get('BACKEND_PORT').default(3000).asPortNumber(),
  secure: get('SECURE').default('true').asBool(),
  url: function () {
    return `http${this.secure ? 's' : ''}://${this.host}:${this.port}`;
  },
};

export const frontendServer = {
  host: get('FRONTEND_HOST').default('localhost').asString(),
  port: get('FRONTEND _PORT').default(3000).asPortNumber(),
  secure: get('SECURE').default('true').asBool(),
  url: function () {
    return `http${this.secure ? 's' : ''}://${this.host}:${this.port}`;
  },
};

export const jwtConfig = {
  refreshExpire: {
    ms() {
      return ms(this.value);
    },
    value: get('REFRESH_EXPIRE').required().asString(),
  },
  accessExpire: {
    ms() {
      return ms(this.value);
    },
    value: get('ACCESS_EXPIRE').required().asString(),
  },
  secret: get('SECRET').required().asString(),
};

export const passwordSaltRounds: number = get('PASS_SALT_ROUNDS')
  .required()
  .asInt();
