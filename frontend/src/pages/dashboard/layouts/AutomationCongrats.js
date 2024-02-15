import { useState } from 'react';
import { Modal, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getFullS3Url } from '../../../config-global';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { SOCIAL_TITLES } from '../../../utils/types';
import { ArrowLeftOutlined, CheckOutlined, PlaySquareOutlined } from '@ant-design/icons';
import CopyText from '../../../components/CopyText';

const { Title } = Typography;

export default function AutomationCongrats({ guest, showActionBtns = false, onGoBack = () => {} }) {
  const navigate = useNavigate();
  const [openVideoPreview, setOpenVideoPreview] = useState(false);

  const connectedSocials = (guest?.socials || []).reduce((acc, item) => {
    if (!item || !item.isConnected) return acc;

    const { type, subType } = item;

    return [...acc, `${SOCIAL_TITLES[type]} ${subType}`];
  }, []);

  return (
    <div className="mt-2 bg-F7F3F9 p-3 br-5px">
      <Title level={3}>👏 Congrats, your new Upplaud is ready to pull in new interest!</Title>
      <Title level={5}>
        Voters will be directed to:{' '}
        <Link target="_blank" to={`/vote/${guest?._id}`}>
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
        Preview your voter invitation video:{' '}
        <Button
          className="ml-1"
          icon={<PlaySquareOutlined />}
          onClick={() => setOpenVideoPreview(true)}
        >
          Preview Video
        </Button>
      </Title>
      <Title level={5} className="mb-1">
        Your guest will be invited to connect here:{' '}
        <Link target="_blank" to={`/guest-acceptance/${guest?._id}`}>
          Guest Invitation Page
        </Link>
      </Title>
      <Title level={5} className="mt-0">
        Their private invite password is:{' '}
        <CopyText text={guest?.password} className="d-inline-block w-125px ml-1" />
      </Title>

      <Title level={4}>
        We'll start posting {'<when your guest connects their social media or> <later today!>'}
      </Title>

      {showActionBtns && (
        <>
          <Button
            type="default"
            size="large"
            onClick={onGoBack}
            icon={<ArrowLeftOutlined />}
            // onClick={() => dispatch(updateState({ isPublished: false }))}
          >
            Go back to make any changes.
          </Button>

          <Button
            type="primary"
            size="large"
            className="d-block mt-2"
            icon={<CheckOutlined />}
            onClick={() => navigate(PATH_DASHBOARD.dashboard.automations)}
          >
            CONFIRM YOUR NEW UPPLAUD & SEE YOUR OTHER AUTOMATIONS
          </Button>
        </>
      )}

      <Modal
        centered
        width={'50%'}
        footer={false}
        open={openVideoPreview}
        title="Preview Video Invitation Post"
        onCancel={() => setOpenVideoPreview(false)}
      >
        <video
          controls
          style={{ width: '100%', height: 'auto' }}
          src={getFullS3Url(guest?.socialShareFileSrc)}
        />
      </Modal>
    </div>
  );
}
