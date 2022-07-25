import { useState } from 'react';
import { Form } from 'react-bootstrap';

function TableSwitch({ isActive }: { isActive: boolean }) {

  const [isOn, setIsOn] = useState(isActive);

  const toggleHandler = () => {
    console.log(isOn)
    setIsOn(!isOn);
  }

  return (
    <>
      <Form.Check
        type="switch"
        className="tc"
        checked={ isOn }
        onChange= { toggleHandler }
      />
    </>
  )
}

export default TableSwitch;