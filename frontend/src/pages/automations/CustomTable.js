import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Table,
  Button,
  Tooltip,
  TableBody,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import CustomTableRow from './CustomTableRow';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import { useTable, TableHeadCustom, TableSelectedAction } from '../../components/table';

CustomTable.propTypes = {
  setTableData: PropTypes.func,
  tableData: PropTypes.array.isRequired,
  tableHead: PropTypes.array.isRequired,
};

export default function CustomTable({ tableData = [], tableHead = [], setTableData }) {
  const {
    page,
    order,
    onSort,
    setPage,
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

  const [openConfirm, setOpenConfirm] = useState(false);

  const dataInPage = tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleCloseConfirm = () => setOpenConfirm(false);

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);

    setSelected([]);
    // setTableData(deleteRow);

    if (page > 0 && dataInPage.length < 2) setPage(page - 1);
  };

  const handleDeleteRows = (selectedRows) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
    setSelected([]);
    // setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === tableData.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  return (
    <Card>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <TableSelectedAction
          rowCount={tableData.length}
          numSelected={selected.length}
          onSelectAllRows={(checked) =>
            onSelectAllRows(
              checked,
              tableData.map((row) => row.id)
            )
          }
          action={
            <Tooltip title="Delete">
              <IconButton color="primary" onClick={() => setOpenConfirm(true)}>
                <Iconify icon="eva:trash-2-outline" />
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
              rowCount={tableData.length}
              numSelected={selected.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row._id)
                )
              }
            />

            <TableBody>
              {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <CustomTableRow
                  row={row}
                  key={row._id}
                  selected={selected.includes(row._id)}
                  onSelectRow={() => onSelectRow(row._id)}
                  onDeleteRow={() => handleDeleteRow(row._id)}
                />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePagination
        page={page}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        rowsPerPageOptions={rowsPerPageOptions}
        onRowsPerPageChange={onChangeRowsPerPage}
      />

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
