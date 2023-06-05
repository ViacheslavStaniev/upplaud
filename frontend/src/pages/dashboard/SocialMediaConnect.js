import React from 'react';
import axios from '../../utils/axios';
import { APP_BASEURL } from '../../config-global';
import { useAuthContext } from '../../auth/AuthProvider';
import { Button, Space, Typography, Dropdown, notification } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import CustomIcon from '../../components/CustomIcon';

const { Title, Link, Text } = Typography;

const FACEBOOK = 'FB';
const LINKEDIN = 'LN';
const INSTAGRAM = 'IN';
const SocialTitles = { [FACEBOOK]: 'Facebook', [LINKEDIN]: 'LinkedIn', [INSTAGRAM]: 'Instagram' };

export default function SocialMediaConnect({ showTitle = true, className = '' }) {
  const { user } = useAuthContext();
  const { socialAccounts } = user;
  const getItem = (type) => socialAccounts.find((item) => item.type === type);

  const isSocialConnected = (type) => {
    const item = getItem(type);
    if (item) {
      const { page, group, profile } = item;
      return page?.isConnected || group?.isConnected || profile?.isConnected;
    }

    return false;
  };

  const getItems = (type = FACEBOOK) => {
    const item = getItem(type) || {};

    const title = SocialTitles[type];
    const { page, group, profile } = item;
    const getURL = (subType) => `${APP_BASEURL}/auth/connect/${title.toLowerCase()}/${subType}`;

    const items = [
      {
        key: 'page',
        label: <LinkItem title={title} subTitle="Page" href={getURL('page')} item={page} />,
      },
      {
        key: 'group',
        label: <LinkItem title={title} subTitle="Group" href={getURL('group')} item={group} />,
      },
      {
        key: 'profile',
        label: (
          <LinkItem title={title} subTitle="Profile" href={getURL('profile')} item={profile} />
        ),
      },
    ];

    if (type === LINKEDIN) {
      const isConnected = isSocialConnected(LINKEDIN);
      items.push({
        key: 'try',
        label: (
          <>
            {!isConnected && (
              <Text style={{ display: 'block' }}>Please connect the account first.</Text>
            )}

            <Button block type="primary" disabled={!isConnected}>
              Try Sample Post Testing{' '}
            </Button>
          </>
        ),
        onClick: async (e) => {
          try {
            const res = await axios.post(`users/samplepost`);
            console.log(res);
            notification.success({ message: 'Success', description: res.data?.msg });
          } catch (error) {
            console.log(error);
            notification.error({ message: 'Error', description: error?.msg });
          }
        },
      });
    }

    return type === FACEBOOK ? items : items.filter((item) => item.key !== 'group');
  };

  return (
    <div className={`social-media ${className}`}>
      {showTitle && <Title level={3}>Connect with social media</Title>}

      <Space size={16}>
        <Dropdown arrow menu={{ items: getItems(FACEBOOK) }} trigger={['click']}>
          <Button size="large" shape="round" type="facebook" icon={<CustomIcon name="facebook" />}>
            {isSocialConnected(FACEBOOK) ? 'Connected' : 'Connect'} with Facebook
          </Button>
        </Dropdown>

        {/* <Button hidden size="large" shape="round" type="instagram" icon={<CustomIcon name="instagram" />}>
          Connect with Instagram
        </Button> */}

        <Dropdown arrow menu={{ items: getItems(LINKEDIN) }} trigger={['click']}>
          <Button size="large" shape="round" type="linkedin" icon={<CustomIcon name="linkedin" />}>
            {isSocialConnected(LINKEDIN) ? 'Connected' : 'Connect'} with LinkedIn
          </Button>
        </Dropdown>
      </Space>
    </div>
  );
}

function LinkItem({ href, title, subTitle, item }) {
  const isConnected = item?.isConnected;

  return (
    // <Space className={isConnected ? 'disabled opacity-85' : ''}>
    <Space>
      <Link className="capitalize" href={href}>
        {title} {subTitle}
      </Link>
      {isConnected && (
        <div>
          <CheckCircleFilled className="color-0AB6B6" />
          <Text className="color-0AB6B6" style={{ marginLeft: 2.5 }}>
            Connected
          </Text>
        </div>
      )}
    </Space>
  );
}
