import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useFormContext, Controller } from 'react-hook-form';
import RHFInputLabel from './RHFInputLabel';

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
          <DatePicker
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!error}
                helperText={error?.message}
                {...other}
              />
            )}
          />
        )}
      />
    </div>
  );
}
