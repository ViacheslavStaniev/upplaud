import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';
import { useSettingsContext } from '../../components/settings';

export default function EmailTemplates() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Email Template | {process.env.REACT_APP_APP_NAME}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Email Template
        </Typography>

        <Typography gutterBottom>
          {process.env.REACT_APP_APP_NAME} can invite your guests to connect their social media to
          automatically promote their upcoming episode and collect questions from their connections.
          Often, reminders are helpful. You can manually remind & invite your guests through the
          Automations dashboard. Below, you can edit the 3 successive emails that{' '}
          {process.env.REACT_APP_APP_NAME} can automatically send to your guests.
        </Typography>
      </Container>
    </>
  );
}
