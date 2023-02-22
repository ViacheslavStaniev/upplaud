import { Container, Card, Typography } from '@mui/material';
import { useSettingsContext } from '../../components/settings';
import AppTitle from '../../components/AppTitle';

export default function PostingTemplate() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <AppTitle title="Posting Template" />

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Posting Template
        </Typography>

        <Card sx={{ bgcolor: 'background.lightPurple', p: 2 }}>
          <Typography gutterBottom>
            You can have up to 5 postcards posted per episode, promoting it on your social media &
            on your guests&apos;. In this screen, you can edit the color & text of each
            postcard&apos;s Headline.
          </Typography>

          <Typography gutterBottom>
            Plus you can customize the Postcard posting schedule for your social media. This will be
            the default for your Guest. But they can tailor their posting schedule for themselves.
          </Typography>

          <Typography>
            Each postcard will automatically be updated with your Guest&apos;s name, topic title,
            recording date & the Ask Page URL. What you&apos;ll see below is simply a template for
            your headline customization.
          </Typography>
        </Card>
      </Container>
    </>
  );
}
