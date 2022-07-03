import { group, groupExt } from '../../domain/group.interface';

interface GroupManagerInterface {
  insert(group: group): Promise<number>;

  selectAll(): Promise<groupExt[]>;

  select(seq: number): Promise<groupExt>;

  update(props: { seq: number, group_nm: string }): Promise<number>;
}

export default GroupManagerInterface;