import user from '../../domain/user.interface';

interface LoginManagerInterface {
  login(id: string, password: string): Promise<string|user>;

  checkDupId(id: string): Promise<string>;
}

export default LoginManagerInterface;