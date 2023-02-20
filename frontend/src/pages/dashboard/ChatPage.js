import { Helmet } from 'react-helmet-async';
// sections
import { Chat } from '../../sections/@dashboard/chat';

// ----------------------------------------------------------------------

export default function ChatPage() {
  return (
    <>
      <Helmet>
        <title> Chat | {process.env.REACT_APP_APP_NAME}</title>
      </Helmet>

      <Chat />
    </>
  );
}
