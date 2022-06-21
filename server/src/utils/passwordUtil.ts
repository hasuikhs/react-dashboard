import bcrypt from 'bcrypt';
require('dotenv').config();

function encodePassword(password: string): string {
  return bcrypt.hashSync(password, Number(process.env.PASS_SALT as string));
}

function checkPassword(password: string, encodedPassword: string): boolean {
  return bcrypt.compareSync(password, encodedPassword);
}

function test(password: string) {
  console.log(password);

  let end = bcrypt.hashSync(password, Number(process.env.PASS_SALT as string));

  return bcrypt.compareSync(password, end);
}

export { encodePassword, checkPassword, test };