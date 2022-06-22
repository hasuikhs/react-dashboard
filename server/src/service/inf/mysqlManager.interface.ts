import test from '../../domain/test.interface';

interface MysqlManagerInterface {

  connect(): void;

  insert(test: test): test;

  selectAll(): void;
}

export default MysqlManagerInterface;