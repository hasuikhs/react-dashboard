import { useState } from 'react';
import { InputGroup, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchInterface {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
  useAsyncDebounce: any;
}

function TableSearch({ preGlobalFilteredRows, globalFilter, setGlobalFilter, useAsyncDebounce }: SearchInterface) {

  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <>
      <Row>
        <Col md={ 10 }></Col>
        <Col md={ 2 }>
          <InputGroup size="sm" className="mb-1">
            <Form.Control
              placeholder="검색어 입력"
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
        </Col>
      </Row>
    </>
  )
}

export default TableSearch;