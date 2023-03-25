import PropTypes from 'prop-types';
import { Delete, Search } from '@mui/icons-material';
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';

UserTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  filterRole: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterRole: PropTypes.func,
  onResetFilter: PropTypes.func,
  optionsRole: PropTypes.arrayOf(PropTypes.string),
};

export default function UserTableToolbar({
  isFiltered,
  filterName,
  filterRole,
  optionsRole,
  onFilterName,
  onFilterRole,
  onResetFilter,
}) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        select
        label="Role"
        value={filterRole}
        onChange={onFilterRole}
        SelectProps={{ MenuProps: { PaperProps: { sx: { maxHeight: 260 } } } }}
        sx={{ maxWidth: { sm: 240 }, textTransform: 'capitalize' }}
      >
        {optionsRole.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{ mx: 1, borderRadius: 0.75, typography: 'body2', textTransform: 'capitalize' }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button color="error" sx={{ flexShrink: 0 }} onClick={onResetFilter} startIcon={<Delete />}>
          Clear
        </Button>
      )}
    </Stack>
  );
}
