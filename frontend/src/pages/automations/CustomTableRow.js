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
import {
  Edit,
  Email,
  Delete,
  Settings,
  Description,
  CalendarToday,
  PauseCircleOutline,
  CloudDownloadOutlined,
} from '@mui/icons-material';
import Label from '../../components/label';
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
            <Email />
          </IconButton>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton>
            <CalendarToday />
          </IconButton>
          <IconButton>
            <PauseCircleOutline />
          </IconButton>
          <br />
          <IconButton>
            <CloudDownloadOutlined />
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
          <IconButton>
            <Description />
          </IconButton>
          <IconButton onClick={() => setOpenConfirm(true)}>
            <Delete />
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
