import React from 'react';
import API from './common/API';

function App() {

  const get = async () => {
    let res = await API.post('/token/', {
      'id': 'test',
      'password': 'adsf'
    });

    console.log('t', res.data)
  }

  get();

  return (
    <div className="App">
    </div>
  );
}

export default App;
