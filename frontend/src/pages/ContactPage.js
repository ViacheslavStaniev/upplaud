import { Container, Box } from '@mui/material';
import { _mapContact } from '../_mock/arrays';
import { ContactHero, ContactForm, ContactMap } from '../sections/contact';
import AppTitle from '../components/AppTitle';

export default function ContactPage() {
  return (
    <>
      <AppTitle title="Contact Us" />

      <ContactHero />

      <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <ContactForm />

          <ContactMap contacts={_mapContact} />
        </Box>
      </Container>
    </>
  );
}
