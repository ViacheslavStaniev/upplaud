import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Checkbox, TableRow, TableCell, IconButton, Typography } from '@mui/material';
import { Link, Launch, Delete, PauseCircleOutline } from '@mui/icons-material';
import Label from '../../components/label';
import ConfirmDialog from '../../components/confirm-dialog';

CustomTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function CustomTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const { guest, show, recordingDate } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Typography variant="subtitle2">{show?.name}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography variant="subtitle2" noWrap>
            {`${guest?.firstName} ${guest?.lastName}`}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Label color="warning">Not Automated</Label>
        </TableCell>
        <TableCell align="center">
          <Typography variant="subtitle2">{new Date(recordingDate).toDateString()}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="subtitle2">G:1 H:2 N:3</Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton>
            <Link />
          </IconButton>
          <IconButton>
            <Launch />
          </IconButton>
          <IconButton>
            <PauseCircleOutline />
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
