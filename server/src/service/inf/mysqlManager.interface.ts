import test from '../../domain/test.interface';

interface MysqlManagerInterface {

  insert(test: test): test;

  selectAll(): Promise<test[]>;

}

export default MysqlManagerInterface;