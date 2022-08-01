import { useState } from 'react';
import { Form } from 'react-bootstrap';

function UpdateSwitch({ isActive, onChange }: { isActive: boolean, onChange: any }) {

  const [isOn, setIsOn] = useState(isActive);

  const toggleHandler = () => {
    // console.log(isOn)
    setIsOn(!isOn);
    onChange();
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

export default UpdateSwitch;