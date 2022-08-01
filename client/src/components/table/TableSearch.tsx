import { useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchInterface {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
  useAsyncDebounce: any;
}

function TableSearch({ preGlobalFilteredRows, globalFilter, setGlobalFilter, useAsyncDebounce }: SearchInterface) {

  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <>
      <InputGroup size="sm" className="mb-1 fr" style={{ width: '200px' }}>
        <Form.Control
          placeholder="검색어를 입력해주세요."
          value={ value || '' }
          onChange={ e => {
            setValue(e.target.value);
            onChange(e.target.value);
          } }
        />
        <InputGroup.Text>
          <FontAwesomeIcon icon={ faSearch } />
        </InputGroup.Text>
      </InputGroup>
    </>
  )
}

export default TableSearch;