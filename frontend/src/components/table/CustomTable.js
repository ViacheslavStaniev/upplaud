import { useState } from 'react';
import { paramCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
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
import { PATH_DASHBOARD } from '../../routes/paths';

import Iconify from '../iconify';
import Scrollbar from '../scrollbar';
import ConfirmDialog from '../confirm-dialog';
import CustomTableRow from './CustomTableRow';
import { useTable, TableHeadCustom, TableSelectedAction } from './index';

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
    onChangeRowsPerPage,
  } = useTable();

  const navigate = useNavigate();

  const [openConfirm, setOpenConfirm] = useState(false);

  const dataInPage = tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleCloseConfirm = () => setOpenConfirm(false);

  const handleEditRow = (id) => navigate(PATH_DASHBOARD.user.edit(paramCase(id)));

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);

    setSelected([]);
    setTableData(deleteRow);

    if (page > 0 && dataInPage.length < 2) setPage(page - 1);
  };

  const handleDeleteRows = (selectedRows) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);

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
              orderBy={orderBy}
              headLabel={tableHead}
              rowCount={tableData.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
            />

            <TableBody>
              {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <CustomTableRow
                  row={row}
                  key={row.id}
                  selected={selected.includes(row.id)}
                  onSelectRow={() => onSelectRow(row.id)}
                  onEditRow={() => handleEditRow(row.name)}
                  onDeleteRow={() => handleDeleteRow(row.id)}
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
        rowsPerPageOptions={[7, 14, 21]}
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
