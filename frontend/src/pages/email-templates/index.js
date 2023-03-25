import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useSettingsContext } from '../../components/settings';
import TemplateEditor from './TemplateEditor';
import TemplatesProvider from './TemplatesProvider';
import AppTitle from '../../components/AppTitle';

export default function EmailTemplates() {
  const { themeStretch } = useSettingsContext();
  const [expanded, setExpanded] = useState('1st');

  const items = [
    {
      key: '1st',
      title: 'Invitation 1',
      afterDays: 3,
      subject: '',
      emailText: 'This is dummy email text 1',
    },
    {
      key: '2nd',
      title: 'Invitation 2',
      afterDays: 3,
      subject: '',
      emailText: 'This is dummy email text 2',
    },
    {
      key: '3rd',
      title: 'Invitation 3',
      afterDays: 3,
      subject: '',
      emailText: 'This is dummy email text 3',
    },
    {
      key: '4th',
      title: 'Invitation 4',
      afterDays: 3,
      subject: '',
      emailText: 'This is dummy email text 4',
    },
    {
      key: '5th',
      title: 'Invitation 5',
      afterDays: 3,
      subject: '',
      emailText: 'This is dummy email text 5',
    },
  ];

  return (
    <TemplatesProvider>
      <AppTitle title="Email Template" />

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Email Template
        </Typography>

        <Typography gutterBottom sx={{ mb: 5 }}>
          <AppTitle appNameOnly /> can invite your guests to connect their social media to
          automatically promote their upcoming episode and collect questions from their connections.
          Often, reminders are helpful. You can manually remind & invite your guests through the
          Automations dashboard. Below, you can edit the 3 successive emails that{' '}
          <AppTitle appNameOnly /> can automatically send to your guests.
        </Typography>

        {items.map((item) => (
          <TemplateEditor
            item={item}
            key={item.key}
            expanded={expanded === item.key}
            onExpand={(e, isExpanded) => setExpanded(isExpanded ? item.key : false)}
          />
        ))}
      </Container>
    </TemplatesProvider>
  );
}
