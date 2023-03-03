import { Box, Container, Typography, Stack, Button } from '@mui/material';
import { useSettingsContext } from '../../components/settings';
import AppTitle from '../../components/AppTitle';

export default function GuestingAdmin() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <AppTitle title="Guesting Admin" />

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
      </Container>
    </>
  );
}
