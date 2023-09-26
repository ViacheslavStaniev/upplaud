import axios from '../../utils/axios';
import CustomIcon from '../../components/CustomIcon';
import { useState, useEffect } from 'react';
import { APP_BASEURL } from '../../config-global';
import { useAuthContext } from '../../auth/AuthProvider';
import { SOCIAL_TYPE, SOCIAL_TITLES } from '../../utils/types';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Radio, Button, Space, Typography, Dropdown, notification, Modal, List, Badge } from 'antd';

const { Title, Link, Text, Paragraph } = Typography;
const { FACEBOOK, LINKEDIN } = SOCIAL_TYPE;

export default function SocialMediaConnect({ showTitle = true, className = '' }) {
  const { user } = useAuthContext();
  const socialAccounts = user?.socialAccounts || [];
  const getItem = (type) => socialAccounts.find((item) => item.type === type);
  const [modalConfig, setModalConfig] = useState({
    open: false,
    type: null,
    subType: null,
    accounts: [],
    loading: false,
    selected: null,
  });

  useEffect(() => {
    // Show Page/Group Selection if not selected
    // const fbItem = getItem(FACEBOOK);

    // Show Page Selection if not selected
    const lnItem = getItem(LINKEDIN);
    if (lnItem && lnItem?.page?.isConnected === false && lnItem?.page?.accounts.length > 0) {
      setModalConfig((c) => ({
        ...c,
        open: true,
        type: LINKEDIN,
        subType: 'page',
        accounts: lnItem?.page?.accounts,
      }));
    }
  }, [socialAccounts]);

  const urlParams = new URLSearchParams(window.location.search);
  const isConnected = urlParams.get('isConnected') || '0';

  useEffect(() => {
    if (isConnected === '1' && modalConfig?.open === false && modalConfig?.type === null) {
      notification.success({
        message: 'Success',
        description: 'You have successfully connected your social media account.',
      });
    }
  }, [isConnected, modalConfig]);

  //
  const isSocialConnected = (type) => {
    const item = getItem(type);
    if (item) {
      const { page, group, profile } = item;
      return page?.isConnected || group?.isConnected || profile?.isConnected;
    }

    return false;
  };

  const getConnectIcon = (isConnected = false) => {
    return isConnected ? (
      <CheckCircleFilled className="color-0AB6B6" />
    ) : (
      <CloseCircleFilled className="color-red" />
    );
  };

  // getItems
  const getItems = (type = FACEBOOK) => {
    const item = getItem(type) || {};

    const title = SOCIAL_TITLES[type];
    const { page, group, profile } = item;
    const getURL = (subType) => `${APP_BASEURL}/auth/connect/${title.toLowerCase()}/${subType}`;

    const items = [
      {
        key: 'page',
        icon: getConnectIcon(page?.isConnected),
        label: <LinkItem title={title} subTitle="Page" href={getURL('page')} item={page} />,
      },
      {
        key: 'group',
        icon: getConnectIcon(group?.isConnected),
        label: <LinkItem title={title} subTitle="Group" href={getURL('group')} item={group} />,
      },
      {
        key: 'profile',
        icon: getConnectIcon(profile?.isConnected),
        label: (
          <LinkItem title={title} subTitle="Profile" href={getURL('profile')} item={profile} />
        ),
      },
    ];

    return type === FACEBOOK ? items : items.filter((item) => item.key !== 'group');
  };

  // onPageGroupSelect
  const onPageGroupSelect = async () => {
    const { type, subType, selected } = modalConfig;

    setModalConfig((c) => ({ ...c, loading: true }));

    try {
      const res = await axios.get(`users/connect/${type}/${subType}/${selected}`);
      console.log(res);
      notification.success({ message: 'Success', description: res.data?.msg });
    } catch (error) {
      console.log(error);
      notification.error({ message: 'Error', description: error?.msg });
    } finally {
      setModalConfig((c) => ({ ...c, open: false, loading: false }));
    }
  };

  // socialsBtns
  const socialsBtns = [
    {
      key: 'facebook',
      disabled: true,
      title: 'Facebook',
      items: getItems(FACEBOOK),
      isAccountConnected: isSocialConnected(FACEBOOK),
    },
    {
      key: 'linkedin',
      disabled: false,
      title: 'LinkedIn',
      items: getItems(LINKEDIN),
      isAccountConnected: isSocialConnected(LINKEDIN),
    },
  ];

  return (
    <div className={`social-media ${className}`}>
      {showTitle && <Title level={3}>Connect with social media</Title>}

      <Space size={16}>
        {socialsBtns.map(({ key, title, items, disabled, isAccountConnected }) => (
          <Dropdown arrow key={key} trigger={['click']} menu={{ items }} disabled={disabled}>
            <Badge count={getConnectIcon(isAccountConnected)}>
              <Button
                type={key}
                size="large"
                shape="round"
                disabled={disabled}
                icon={<CustomIcon name={key} />}
              >
                {isAccountConnected ? 'Connected' : 'Connect'} with {title}
              </Button>
            </Badge>
          </Dropdown>
        ))}

        {/* <Button hidden size="large" shape="round" type="instagram" icon={<CustomIcon name="instagram" />}>
          Connect with Instagram
        </Button> */}
      </Space>

      <Modal
        width={600}
        closable={false}
        keyboard={false}
        okText="Connect"
        maskClosable={false}
        open={modalConfig.open}
        onOk={onPageGroupSelect}
        cancelButtonProps={{ disabled: modalConfig.loading }}
        onCancel={() => setModalConfig((c) => ({ ...c, open: false }))}
        okButtonProps={{ disabled: !modalConfig.selected, loading: modalConfig.loading }}
      >
        <Title level={3}>Select {modalConfig.subType}</Title>
        <Paragraph italic>
          Please select the {modalConfig.subType} you want to connect for your social media
          automation.
        </Paragraph>
        <List
          itemLayout="horizontal"
          dataSource={modalConfig.accounts}
          header={<Text strong>Your {modalConfig.subType}s</Text>}
          renderItem={({ id, name, description }) => (
            <List.Item
              extra={
                <Radio
                  value={id}
                  checked={modalConfig.selected === id}
                  onChange={({ target }) =>
                    setModalConfig((c) => ({ ...c, selected: target.checked ? id : null }))
                  }
                >
                  Select
                </Radio>
              }
            >
              <List.Item.Meta
                title={name}
                description={
                  <Paragraph ellipsis type="secondary" className="m-0">
                    {description}
                  </Paragraph>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}

function LinkItem({ href, title, subTitle }) {
  return (
    <Link className="capitalize" href={href}>
      {title} {subTitle}
    </Link>
  );
}
