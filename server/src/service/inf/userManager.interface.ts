import { user } from '../../domain/user.mysql.interface'

interface UserManagerInterface {
  insert(doc: user): Promise<string>;
}

export default UserManagerInterface;;