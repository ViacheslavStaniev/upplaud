import { Stack, Button } from '@mui/material';
import { FacebookOutlined, LinkedIn, Instagram } from '@mui/icons-material';
import useResponsive from '../../hooks/useResponsive';

export default function SocialConnect() {
  const isDesktop = useResponsive('up', 'lg');
  const flexDirection = isDesktop ? 'row' : 'column';

  return (
    <Stack sx={{ gap: 3, mb: 5, flexDirection }}>
      <Button
        size="large"
        type="button"
        shape="circular"
        variant="contained"
        startIcon={<FacebookOutlined />}
        style={{ background: '#1877F2' }}
      >
        Connect with Facebook
      </Button>
      <Button
        size="large"
        type="button"
        shape="circular"
        variant="contained"
        startIcon={<Instagram />}
        style={{
          background:
            'radial-gradient(128.57% 128.57% at 10.71% 105.36%, #FFCB52 0%, #E34677 56.25%, #C938AC 100%)',
        }}
      >
        Connect with Instagram
      </Button>
      <Button
        size="large"
        type="button"
        shape="circular"
        variant="contained"
        startIcon={<LinkedIn />}
        style={{ background: '#0A66C2' }}
      >
        Connect with LinkedIn
      </Button>
    </Stack>
  );
}
