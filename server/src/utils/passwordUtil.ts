import bcrypt from 'bcrypt';
require('dotenv').config();

function encodePassword(password: string): string {
  return bcrypt.hashSync(password, Number(process.env.PASS_SALT as string));
}

function checkPassword(password: string, encodedPassword: string): boolean {
  return bcrypt.compareSync(password, encodedPassword);
}

export { encodePassword, checkPassword };