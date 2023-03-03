import { useState, useEffect } from 'react';
import { Box, Stack, Button, Container, Typography } from '@mui/material';
import { getGuestsList } from '../../actions/guests';
import { useAuthContext } from '../../auth/useAuthContext';
import { useSettingsContext } from '../../components/settings';
import AutomationsTable from './CustomTable';
import AppTitle from '../../components/AppTitle';

export default function Automations() {
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();

  const [guestList, setGuestList] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await getGuestsList(user.show?._id);
      setGuestList(list);
    })();
  }, [user.show?._id]);

  console.log(user, guestList);

  const tableHead = [
    { id: 'name', label: 'NAME', align: 'left' },
    { id: 'recordingDate', label: 'RECORDING DATE', align: 'left' },
    { id: 'status', label: 'STATUS', align: 'center' },
    { id: 'asqs', label: 'ASQs', align: 'center' },
    { id: 'todo', label: 'TASK TO DO', align: 'center' },
    { id: 'action', label: 'ACTIONS', align: 'right' },
  ];

  return (
    <>
      <AppTitle title="Automations" />

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Automations
        </Typography>

        <Stack sx={{ flexDirection: 'row', gap: 3, marginBottom: 3 }}>
          <Typography flex={1}>
            Here you can manage the automation of your guests & track the number of audience
            submissions connected to your Guest, Host (you), or Neither. You can also export the
            Submissions for each guest, featuring participants’ names, emails, questions & Audio Ask
            files.
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
              REMIND INVITES
            </Button>
          </Box>
        </Stack>

        <AutomationsTable tableHead={tableHead} tableData={guestList} />
      </Container>
    </>
  );
}
