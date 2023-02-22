import { Link as RouterLink } from 'react-router-dom';
import { Stack, Typography, Link } from '@mui/material';
import { PATH_AUTH } from '../../routes/paths';
import LoginLayout from '../../layouts/login';
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';
import AppTitle from '../../components/AppTitle';

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">
          Sign in to <AppTitle appNameOnly />
        </Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link component={RouterLink} to={PATH_AUTH.register} variant="subtitle2">
            Create an account
          </Link>
        </Stack>
      </Stack>

      <AuthLoginForm />

      <AuthWithSocial />
    </LoginLayout>
  );
}
