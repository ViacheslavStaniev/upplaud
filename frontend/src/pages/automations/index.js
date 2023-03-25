import { Box, Stack, Button, Container, Typography } from '@mui/material';
import { useSettingsContext } from '../../components/settings';
import AutomationsTable from './AutomationsTable';
import AppTitle from '../../components/AppTitle';
import { GuestsProvider } from './GuestsProvider';

export default function Automations() {
  const { themeStretch } = useSettingsContext();

  return (
    <GuestsProvider>
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

        <AutomationsTable />
      </Container>
    </GuestsProvider>
  );
}
