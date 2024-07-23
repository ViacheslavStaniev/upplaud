import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography, Stack } from '@mui/material';
import { MaintenanceIllustration } from '../assets/illustrations';
import AppTitle from '../components/AppTitle';

export default function MaintenancePage() {
  return (
    <>
      <AppTitle title="Maintenance" />

      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant="h3" paragraph>
          Website currently under maintenance
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          We are currently working hard on this page!
        </Typography>

        <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

        <Button component={RouterLink} to="/" size="large" variant="contained">
          Go to Home
        </Button>
      </Stack>
    </>
  );
}
