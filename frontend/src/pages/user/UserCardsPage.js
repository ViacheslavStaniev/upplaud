import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Box } from '@mui/material';
// routes
import { ROUTES } from '../../routes/paths';
// _mock_
import { _userCards } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import { UserCard } from '../../sections/@dashboard/user/cards';

// ----------------------------------------------------------------------

export default function UserCardsPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> User: Cards | Podasq</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="User Cards"
          links={[{ name: 'Dashboard', href: ROUTES.root }, { name: 'User', href: ROUTES.user.root }, { name: 'Cards' }]}
        />

        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {_userCards.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Box>
      </Container>
    </>
  );
}
