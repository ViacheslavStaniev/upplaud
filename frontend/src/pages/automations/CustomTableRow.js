import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import ConfirmDialog from '../../components/confirm-dialog';

CustomTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function CustomTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const { guest, recordingDate } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={guest?.firstName} src={guest?.profile?.picture} />

            <Typography variant="subtitle2" noWrap>
              {`${guest?.firstName} ${guest?.lastName}`}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="left">{new Date(recordingDate).toDateString()}</TableCell>
        <TableCell align="center">
          <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Label color="success">Guest Posting Info</Label>
            <Label color="info">Host Posting Info</Label>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Label color="success">G: 1</Label>
            <Label color="info">H: 2</Label>
            <Label>N: 3</Label>
          </Stack>
        </TableCell>
        <TableCell align="center">TASK TO DO</TableCell>
        <TableCell align="right">
          <IconButton>
            <Iconify icon="mdi:envelope" />
          </IconButton>
          <IconButton>
            <Iconify icon="mdi:pencil" />
          </IconButton>
          <IconButton>
            <Iconify icon="material-symbols:calendar-today-outline" />
          </IconButton>
          <IconButton>
            <Iconify icon="material-symbols:pause-circle-outline-rounded" />
          </IconButton>
          <br />
          <IconButton>
            <Iconify icon="material-symbols:cloud-download-outline" />
          </IconButton>
          <IconButton>
            <Iconify icon="mdi:gear" />
          </IconButton>
          <IconButton>
            <Iconify icon="material-symbols:description" />
          </IconButton>
          <IconButton onClick={() => setOpenConfirm(true)}>
            <Iconify icon="bi:trash" />
          </IconButton>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        title="Delete"
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
