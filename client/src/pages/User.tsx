import React, { useMemo } from 'react';
import { Container, Button } from 'react-bootstrap';
import MainBar from '../components/MainBar';
import './css/Home.module.css';

import Table from '../components/Table';

function User(): JSX.Element {

  const tt = 'this is value'

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      width: 4000,
      Header: 'Info',
      accessor: 'info',
      Cell: ({ value }: any) => (
        <Button size="sm" onClick={ () => console.log(value)} >
          { value }
        </Button>
      )
    },
  ], []);

  const data = useMemo(() => [
    {
      name: 'kim',
      info: 'test'
    }
  ], []);

  return (
    <>
      <MainBar />
      <Container>
        <h1>User</h1>
        <Table columns={ columns } data={ data } />
      </Container>
    </>
  )
}

export default User;