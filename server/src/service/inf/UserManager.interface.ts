import { user } from '../../domain';

interface UserManagerInterface {
  insert(user: user): Promise<number>;

  selectAll(): Promise<user[]>;

  select(seq: number): Promise<user>;

  update(props: {seq: number, userNm: string, userPw?: string}): Promise<number>;

  delete(seq: number): Promise<number>;
}

export default UserManagerInterface;;