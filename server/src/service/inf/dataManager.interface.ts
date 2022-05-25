import { account } from '../../domain/account.interface';
import { doc } from '../../domain/doc.interface';
import { server } from '../../domain/server.interface';

interface DataManagerInterface {
  insert(doc: server | account | doc): Promise<any>;

  select(): Promise<any[]>;               // overload signature
  select(idx: number): Promise<any>;      // overload signature
  select(group: string): Promise<any[]>;  // overload signature
  
  update(idx: number, doc: server | account | doc): Promise<any>;
  
  delete(idx: number): Promise<any>;
}

export default DataManagerInterface;