import { Divider, IconButton, Stack } from '@mui/material';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useAuthContext } from '../../auth/useAuthContext';
import Iconify from '../../components/iconify';

export default function AuthWithSocial() {
  const { loginWithFacebook, loginWithInstagram, loginWithLinkedIn } = useAuthContext();

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

  const handleINLogin = async () => {
    try {
      if (loginWithInstagram) {
        loginWithInstagram();
      }

      console.log('INSTAGRAM LOGIN');
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
        {/* <IconButton onClick={handleFBLogin}>
          <Iconify icon="mdi:facebook" color="#4267B2" />
        </IconButton> */}
        <FacebookLogin
          appId="2070701896457664"
          fields="name,email,picture"
          callback={console.log}
          render={({ onClick }) => (
            <IconButton onClick={onClick}>
              <Iconify icon="mdi:facebook" color="#4267B2" />
            </IconButton>
          )}
        />

        <IconButton onClick={handleINLogin}>
          <Iconify icon="mdi:instagram" color="#C938AC" />
        </IconButton>

        <IconButton onClick={handleLNLogin}>
          <Iconify icon="mdi:linkedin" color="#0A66C2" />
        </IconButton>
      </Stack>
    </div>
  );
}
