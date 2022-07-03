import { user, userExt } from '../../domain/user.mysql.interface'

interface UserManagerInterface {
  insert(doc: user): Promise<number>;

  selectAll(): Promise<userExt[]>;

  select(seq: number): Promise<userExt>;

  update(props: {seq: number, user_nm: string, user_pw?: string}): Promise<number>;

  delete(seq: number): Promise<number>;
}

export default UserManagerInterface;;