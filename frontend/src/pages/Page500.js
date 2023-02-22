import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { MotionContainer, varBounce } from '../components/animate';
import { SeverErrorIllustration } from '../assets/illustrations';
import AppTitle from '../components/AppTitle';

export default function Page500() {
  return (
    <>
      <AppTitle title="500 Internal Server Error" />

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            500 Internal Server Error
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            There was an error, please try again later.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} to="/" size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </>
  );
}
