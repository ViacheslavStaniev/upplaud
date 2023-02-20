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
import Label from '../label';
import Iconify from '../iconify';
import ConfirmDialog from '../confirm-dialog';

CustomTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function CustomTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { name, avatarUrl, recordingDate, status, asqs, todo } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />

            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{recordingDate}</TableCell>

        <TableCell align="center">
          <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Label color="success">
              Guest {status.guest.posted} {status.guest.date}
            </Label>
            <Label color="info">
              Host {status.host.posted} {status.host.date}
            </Label>
          </Stack>
        </TableCell>

        <TableCell align="center">
          {asqs ? (
            <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Label color="success">G: {asqs.g}</Label>
              <Label color="info">H: {asqs.h}</Label>
              <Label>N: {asqs.n}</Label>
            </Stack>
          ) : (
            ''
          )}
        </TableCell>

        <TableCell align="center">{todo}</TableCell>

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
