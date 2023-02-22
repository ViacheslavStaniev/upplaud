import { Container, Typography } from '@mui/material';
import { useSettingsContext } from '../../components/settings';
import AppTitle from '../../components/AppTitle';

export default function EmailTemplates() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <AppTitle title="Email Template" />

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Email Template
        </Typography>

        <Typography gutterBottom>
          <AppTitle appNameOnly /> can invite your guests to connect their social media to
          automatically promote their upcoming episode and collect questions from their connections.
          Often, reminders are helpful. You can manually remind & invite your guests through the
          Automations dashboard. Below, you can edit the 3 successive emails that{' '}
          <AppTitle appNameOnly /> can automatically send to your guests.
        </Typography>
      </Container>
    </>
  );
}
