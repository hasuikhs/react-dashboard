import { group } from '../../domain';

interface GroupManagerInterface {
  insert(group: group): Promise<number>;

  selectAll(): Promise<group[]>;

  select(seq: number): Promise<group>;

  update(props: { seq: number, groupNm: string }): Promise<number>;

  delete(seq: number): Promise<number>;
}

export default GroupManagerInterface;