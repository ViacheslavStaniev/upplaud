import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, Stack, Button } from '@mui/material';
import { _userList } from '../../_mock/arrays';
import { useSettingsContext } from '../../components/settings';
import CustomTable from '../../components/table/CustomTable';

export default function GuestingAdmin() {
  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState(_userList);

  const tableHead = [
    { id: 'name', label: 'SHOW NAME', align: 'left' },
    { id: 'host', label: 'HOST', align: 'left' },
    { id: 'status', label: 'STATUS', align: 'left' },
    { id: 'date', label: 'DATE', align: 'center' },
    { id: 'submission', label: 'SUBMISSION', align: 'left' },
    { id: 'action', label: 'ACTIONS', align: 'right' },
  ];

  return (
    <>
      <Helmet>
        <title> Guesting Admin | {process.env.REACT_APP_APP_NAME}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Guesting Admin
        </Typography>

        <Stack sx={{ flexDirection: 'row', gap: 3, marginBottom: 3 }}>
          <Typography flex={1}>
            Here you can track the automation of your show appearances:
          </Typography>

          <Box flex="inherit">
            <Button
              fullWidth
              color="info"
              size="large"
              type="button"
              shape="circular"
              variant="contained"
            >
              ADD SHOW
            </Button>
          </Box>
        </Stack>

        <CustomTable tableData={tableData} tableHead={tableHead} setTableData={setTableData} />
      </Container>
    </>
  );
}
