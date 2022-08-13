import { useState } from 'react';
// material
import { Switch } from '@mui/material';

function UpdateSwitch({ isActive, onChange }: { isActive: boolean, onChange: any }) {

  const [isOn, setIsOn] = useState(isActive);

  const toggleHandler = () => {
    setIsOn(!isOn);
    onChange();
  }

  return (
    <Switch
      size="small"
      className="tc"
      color="info"
      checked={ isOn }
      onChange={ toggleHandler }
    />
  )
}

export default UpdateSwitch;