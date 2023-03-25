import { Divider, IconButton, Stack } from '@mui/material';
import { useAuthContext } from '../../auth/useAuthContext';
import Iconify from '../../components/iconify';

export default function AuthWithSocial() {
  const { loginWithFacebook, loginWithLinkedIn } = useAuthContext();

  const handleFBLogin = async () => {
    try {
      if (loginWithFacebook) {
        loginWithFacebook();
      }

      console.log('FACEBOOK LOGIN');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLNLogin = async () => {
    try {
      if (loginWithLinkedIn) {
        loginWithLinkedIn();
      }

      console.log('LINKEDIN LOGIN');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, ::after': {
            borderTopStyle: 'dashed',
          },
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton onClick={handleFBLogin}>
          <Iconify icon="mdi:facebook" color="#4267B2" />
        </IconButton>

        <IconButton onClick={handleLNLogin}>
          <Iconify icon="mdi:linkedin" color="#0A66C2" />
        </IconButton>
      </Stack>
    </div>
  );
}
