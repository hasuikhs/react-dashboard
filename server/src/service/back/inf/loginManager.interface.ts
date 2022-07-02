interface LoginManagerInterface {

  login(id: string, password: string): Promise<string>;

  checkDupId(id: string): Promise<string>;

}

export default LoginManagerInterface;