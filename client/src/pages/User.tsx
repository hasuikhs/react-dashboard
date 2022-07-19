import React, { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import MainBar from '../components/MainBar';
import './css/Home.module.css';

import Table from '../components/Table';

function User(): JSX.Element {
  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Info',
      accessor: 'info'
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