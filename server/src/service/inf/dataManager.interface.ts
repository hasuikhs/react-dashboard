import { user } from '../../domain/user.interface';
import { doc } from '../../domain/doc.interface';
import { server } from '../../domain/server.interface';

interface DataManagerInterface {
  insert(doc: server | user | doc): Promise<any>;

  login(id: string, password: string): Promise<string>;

  select(): Promise<any[]>;               // overload signature
  select(idx: number): Promise<any>;      // overload signature
  select(group: string): Promise<any[]>;  // overload signature
  
  update(idx: number, doc: server | user | doc): Promise<any>;
  
  delete(idx: number): Promise<any>;
}

export default DataManagerInterface;