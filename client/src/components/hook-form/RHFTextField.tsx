import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

interface RHFTextFieldInterface {
  name: string;
  label: string;
  type?: string;
  InputProps?: any;
}

function RHFTextField({ name, label, type, InputProps }: RHFTextFieldInterface) {
  const { control } = useFormContext();

  return (
    <Controller
      name={ name }
      control={ control }
      render={ ({ field, fieldState: { error } }) => (
        <TextField
          { ...field }
          fullWidth
          value={ typeof field.value === 'number' && field.value === 0 ? '' : field.value }
          error={ !!error }
          helperText={ error?.message }
          label={ label }
          type={ type }
          InputProps={ InputProps }
        />
      ) }
    />
  );
}

export default RHFTextField;