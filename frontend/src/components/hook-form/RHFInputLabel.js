import PropTypes from 'prop-types';
import { InputLabel } from '@mui/material';
import { useSettingsContext } from '../settings';

RHFInputLabel.propTypes = {
  label: PropTypes.string,
};

export default function RHFInputLabel({ label = '' }) {
  const { presetsColor } = useSettingsContext();

  return (
    <InputLabel
      color="primary"
      style={{ color: presetsColor.main, textTransform: 'uppercase', letterSpacing: 2 }}
    >
      {label}
    </InputLabel>
  );
}
