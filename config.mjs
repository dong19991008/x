import dotenv from "dotenv";

dotenv.config();

function required(key, defaultValue = undefinded) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Eroor(`키${key}는 undefinded!`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required)("BCRYPR_SALT_ROUNDS", 10),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
};
