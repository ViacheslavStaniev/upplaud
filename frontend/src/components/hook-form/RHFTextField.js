import PropTypes from 'prop-types';
import RHFInputLabel from './RHFInputLabel';
import { TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

RHFTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFTextField({ name, label, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
      <RHFInputLabel label={label} />
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            error={!!error}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            helperText={error ? error?.message : helperText}
            {...other}
          />
        )}
      />
    </div>
  );
}
