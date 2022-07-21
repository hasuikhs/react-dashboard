import React, { useMemo } from 'react';
import { Container, Button } from 'react-bootstrap';
import Mainbar from '../components//MainBar';
import './css/Home.module.css';

import Table from '../components/Table';

function Server(): JSX.Element {

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
      name: 'kim1',
      info: 'test'
    },
    {
      name: 'kim2',
      info: 'test'
    },{
      name: 'kim3',
      info: 'test'
    },{
      name: 'kim4',
      info: 'test'
    },{
      name: 'kim5',
      info: 'test'
    },{
      name: 'kim6',
      info: 'test'
    },{
      name: 'kim7',
      info: 'test'
    },{
      name: 'kim8',
      info: 'test'
    },{
      name: 'kim9',
      info: 'test'
    },{
      name: 'kim10',
      info: 'test'
    },{
      name: 'kim11',
      info: 'test'
    },{
      name: 'kim12',
      info: 'test'
    },{
      name: 'kim13',
      info: 'test'
    },{
      name: 'kim14',
      info: 'test'
    },{
      name: 'kim15',
      info: 'test'
    },{
      name: 'kim16',
      info: 'test'
    },{
      name: 'kim17',
      info: 'test'
    },{
      name: 'kim18',
      info: 'test'
    },{
      name: 'kim19',
      info: 'test'
    },{
      name: 'kim20',
      info: 'test'
    },{
      name: 'kim21',
      info: 'test'
    },{
      name: 'kim22',
      info: 'test'
    },{
      name: 'kim23',
      info: 'test'
    },{
      name: 'kim24',
      info: 'test'
    },{
      name: 'kim25',
      info: 'test'
    },

  ], []);

  return (
    <>
      <Mainbar />
      <Container>
        <h1>Server</h1>
        <Table columns={ columns } data={ data } />
      </Container>
    </>
  )
}

export default Server;