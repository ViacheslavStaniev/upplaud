import { useState } from 'react';
import {
  Box,
  Card,
  Container,
  Typography,
  CardHeader,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import RoleBasedGuard from '../../auth/RoleBasedGuard';
import AppTitle from '../../components/AppTitle';

export default function PermissionDeniedPage() {
  const { themeStretch } = useSettingsContext();

  const [role, setRole] = useState('admin');

  const handleChangeRole = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  return (
    <>
      <AppTitle title="Other Cases: Permission Denied |" />

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Permission Denied"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Permission Denied',
            },
          ]}
        />

        <ToggleButtonGroup
          exclusive
          value={role}
          onChange={handleChangeRole}
          color="primary"
          sx={{ mb: 5 }}
        >
          <ToggleButton value="admin" aria-label="admin role">
            isAdmin
          </ToggleButton>

          <ToggleButton value="user" aria-label="user role">
            isUser
          </ToggleButton>
        </ToggleButtonGroup>

        <RoleBasedGuard hasContent roles={[role]}>
          <Box gap={3} display="grid" gridTemplateColumns="repeat(2, 1fr)">
            {[...Array(8)].map((_, index) => (
              <Card key={index}>
                <CardHeader title={`Card ${index + 1}`} subheader="Proin viverra ligula" />

                <Typography sx={{ p: 3, color: 'text.secondary' }}>
                  Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. In enim justo,
                  rhoncus ut, imperdiet a, venenatis vitae, justo. Vestibulum fringilla pede sit
                  amet augue.
                </Typography>
              </Card>
            ))}
          </Box>
        </RoleBasedGuard>
      </Container>
    </>
  );
}
