import { user, userExt } from '../../domain/user.interface';

interface UserManagerInterface {
  insert(user: user): Promise<number>;

  selectAll(): Promise<userExt[]>;

  select(seq: number): Promise<userExt>;

  update(props: {seq: number, user_nm: string, user_pw?: string}): Promise<number>;

  delete(seq: number): Promise<number>;
}

export default UserManagerInterface;;