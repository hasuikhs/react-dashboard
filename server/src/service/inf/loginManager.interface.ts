interface LoginManagerInterface {
  login(id: string, password: string): Promise<string>;
}

export default LoginManagerInterface;