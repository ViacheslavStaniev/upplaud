import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';
import AppTitle from '../../components/AppTitle';

export default function UserCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <AppTitle title="User: Create a new user" />

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new user"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'User',
              href: PATH_DASHBOARD.user.list,
            },
            { name: 'New user' },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </>
  );
}
