import { Button, Typography } from 'antd';
import { isMobile } from 'react-device-detect';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useAuthContext } from '../../../auth/AuthProvider';
import { SOCIAL_TITLES, POLL_STATUS } from '../../../utils/types';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import CopyText from '../../../components/CopyText';
// import PreviewAutomationVideo from './PreviewAutomationVideo';
import PreviewAutomationImage from './PreviewAutomationImage';

const { Title } = Typography;

export default function AutomationCongrats({ guest, showActionBtns = false, onGoBack = () => {} }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const startHostAutomation = guest?.startHostAutomation || false;
  const isPublished = guest?.status === POLL_STATUS?.PUBLISHED || false;

  const connectedSocials = (guest?.socials || []).reduce((acc, item) => {
    if (!item || !item.isConnected) return acc;

    const { type, subType } = item;

    return [...acc, `${SOCIAL_TITLES[type]} ${subType}`];
  }, []);

  return (
    <div className={`mt-2 bg-F7F3F9 br-5px ${isMobile ? 'p-2' : 'p-3'}`}>
      <Title level={isMobile ? 4 : 3}>
        👏 Congrats, your new Upplaud is ready to pull in new interest!
      </Title>
      <Title level={5}>
        Voters will be directed to:{' '}
        <Link target="_blank" to={`/vote/${user?.userName}/${guest?.uniqueId}`}>
          Voting Page
        </Link>
      </Title>

      <Title level={5}>You've connected:</Title>
      <ul>
        {connectedSocials.map((item, key) => (
          <li key={key} className="capitalize">
            {item}
          </li>
        ))}
      </ul>

      <Title level={5}>
        Preview your voter invitation post:{' '}
        {/* <PreviewAutomationVideo className="ml-1" socialShareFileSrc={guest?.socialShareFileSrc} />{' '} */}
        <PreviewAutomationImage
          showUploadAlert
          className="ml-1"
          pollImageSrc={guest?.pollImageSrc}
          prevEl={
            <Button size="small" disabled={!guest?.pollImageSrc}>
              Preview
            </Button>
          }
        />
      </Title>

      <Title level={5} className="mb-1">
        Your guest will be invited to connect here:{' '}
        <Link target="_blank" to={`/guest-acceptance/${user?.userName}/${guest?.uniqueId}`}>
          Guest Invitation Page
        </Link>
      </Title>
      <Title level={5} className={`mt-0 ${isMobile && 'mb-0'}`}>
        Their private invite password is:{' '}
        <CopyText
          text={guest?.password}
          className={`d-inline-block ${isMobile ? 'w-100' : 'w-125px ml-1'}`}
        />
      </Title>

      <Title level={isMobile ? 5 : 4} className={isMobile && 'mt-2'}>
        We'll start posting{' '}
        {startHostAutomation ? 'when your guest connects their social media.' : 'later today!'}
      </Title>

      {showActionBtns && (
        <>
          <Button
            size="large"
            type="default"
            block={isMobile}
            onClick={onGoBack}
            icon={<ArrowLeftOutlined />}
          >
            Go back to make any changes.
          </Button>

          <Button
            size="large"
            type="primary"
            block={isMobile}
            icon={<CheckOutlined />}
            className="d-block mt-2 text-wrap"
            onClick={() => navigate(PATH_DASHBOARD.dashboard.automations)}
          >
            CONFIRM YOUR NEW UPPLAUD & SEE YOUR OTHER AUTOMATIONS
          </Button>
        </>
      )}

      {!isPublished && (
        <Title level={4} className="mt-3 mb-0" type="danger">
          Your Upplaud is not yet published. Please publish it to start posting.
        </Title>
      )}
    </div>
  );
}
