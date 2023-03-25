import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Tooltip,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { Delete } from '@mui/icons-material';
import CustomTableRow from './CustomTableRow';
import Scrollbar from '../../components/scrollbar';
import EmptyContent from '../../components/empty-content';
import ConfirmDialog from '../../components/confirm-dialog';
import { PATH_DASHBOARD } from '../../routes/paths';
import { useGuestsContext } from './GuestsProvider';
import { useTable, TableHeadCustom, TableSelectedAction } from '../../components/table';

const tableHead = [
  { id: 'name', label: 'NAME', align: 'left' },
  { id: 'recordingDate', label: 'RECORDING DATE', align: 'left' },
  { id: 'status', label: 'STATUS', align: 'center' },
  { id: 'asqs', label: 'ASQs', align: 'center' },
  { id: 'todo', label: 'TASK TO DO', align: 'center' },
  { id: 'action', label: 'ACTIONS', align: 'right' },
];

export default function AutomationsTable() {
  const {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    setSelected,
    onSelectRow,
    onChangePage,
    onSelectAllRows,
    rowsPerPageOptions,
    onChangeRowsPerPage,
  } = useTable();

  const { enqueueSnackbar } = useSnackbar();
  const [openConfirm, setOpenConfirm] = useState(false);
  const { guests, isLoading, onGuestDelete, onManyGuestDelete } = useGuestsContext();

  const totalGuests = guests.length;

  const handleCloseConfirm = () => setOpenConfirm(false);

  // On Guest Delete
  const handleDeleteRow = (id) => {
    onGuestDelete(id);
    enqueueSnackbar('Guest deleted successfully!');
  };

  const handleDeleteRows = (selectedRows) => {
    setSelected([]);
    onManyGuestDelete(selectedRows);
    enqueueSnackbar('Multiple guests deleted successfully!');
  };

  return (
    <Card>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <TableSelectedAction
          rowCount={totalGuests}
          numSelected={selected.length}
          onSelectAllRows={(checked) =>
            onSelectAllRows(
              checked,
              guests.map((row) => row.id)
            )
          }
          action={
            <Tooltip title="Delete">
              <IconButton color="primary" onClick={() => setOpenConfirm(true)}>
                <Delete />
              </IconButton>
            </Tooltip>
          }
        />

        <Scrollbar>
          <Table sx={{ minWidth: 800 }}>
            <TableHeadCustom
              order={order}
              onSort={onSort}
              orderBy={orderBy}
              headLabel={tableHead}
              rowCount={totalGuests}
              numSelected={selected.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  guests.map((row) => row._id)
                )
              }
            />

            <TableBody>
              {totalGuests > 0 ? (
                guests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <CustomTableRow
                      row={row}
                      key={row._id}
                      selected={selected.includes(row._id)}
                      onSelectRow={() => onSelectRow(row._id)}
                      onDeleteRow={() => handleDeleteRow(row._id)}
                    />
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={tableHead.length + 1}>
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      <EmptyContent
                        title="No Guests Found!"
                        description={
                          <>
                            <Typography variant="subtitle2" sx={{ mb: 2 }}>
                              You haven&apos;t added any guests yet. You added guests will apear
                              here.
                            </Typography>

                            <Button variant="contained" href={PATH_DASHBOARD.guestii.addGuest}>
                              Add Guest
                            </Button>
                          </>
                        }
                      />
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      {totalGuests > 0 && (
        <TablePagination
          page={page}
          component="div"
          count={totalGuests}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      )}

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </Card>
  );
}
