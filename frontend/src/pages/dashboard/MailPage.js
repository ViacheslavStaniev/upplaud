import { Helmet } from 'react-helmet-async';
// sections
import { Mail } from '../../sections/@dashboard/mail';

// ----------------------------------------------------------------------

export default function MailPage() {
  return (
    <>
      <Helmet>
        <title> Mail | {process.env.REACT_APP_APP_NAME}</title>
      </Helmet>

      <Mail />
    </>
  );
}
