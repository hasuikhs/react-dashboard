import React from 'react';
import API from './common/API';

function App() {

  const get = async () => {
    let res = await API.post('token', {
      'id': 'test',
      'password': 'asdf'
    });

    console.log('t', res.data)

    let res2 = await API.get('api/user/1', {
      headers: {
        'Authorization': res.data.token
      }
    });

    // api test
    console.log('ret', res2.data)

  }

  get();

  return (
    <div className="App">
    </div>
  );
}

export default App;
