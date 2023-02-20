import { Helmet } from 'react-helmet-async';
// sections
import Register from '../../sections/auth/Register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register | {process.env.REACT_APP_APP_NAME}</title>
      </Helmet>

      <Register />
    </>
  );
}
