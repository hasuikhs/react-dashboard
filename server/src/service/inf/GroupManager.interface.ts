import group from '../../domain/group.interface';

interface GroupManagerInterface {
  insert(group: group): Promise<number>;

  selectAll(): Promise<group[]>;

  select(seq: number): Promise<group>;

  update(props: { seq: number, groupNm: string }): Promise<number>;
}

export default GroupManagerInterface;