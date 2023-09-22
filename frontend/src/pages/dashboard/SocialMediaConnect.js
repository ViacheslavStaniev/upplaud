import axios from '../../utils/axios';
import CustomIcon from '../../components/CustomIcon';
import { useState, useEffect } from 'react';
import { APP_BASEURL } from '../../config-global';
import { CheckCircleFilled } from '@ant-design/icons';
import { useAuthContext } from '../../auth/AuthProvider';
import { Radio, Button, Space, Typography, Dropdown, notification, Modal, List } from 'antd';

const { Title, Link, Text, Paragraph } = Typography;

const FACEBOOK = 'FB';
const LINKEDIN = 'LN';
const INSTAGRAM = 'IN';
const SocialTitles = { [FACEBOOK]: 'Facebook', [LINKEDIN]: 'LinkedIn', [INSTAGRAM]: 'Instagram' };

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
    const fbItem = getItem(FACEBOOK);

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

  console.log('modalConfig', modalConfig);

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

  return (
    <div className={`social-media ${className}`}>
      {showTitle && <Title level={3}>Connect with social media</Title>}

      <Space size={16}>
        <Dropdown arrow trigger={['click']} menu={{ items: getItems(FACEBOOK) }}>
          <Button size="large" shape="round" type="facebook" icon={<CustomIcon name="facebook" />}>
            {isSocialConnected(FACEBOOK) ? 'Connected' : 'Connect'} with Facebook
          </Button>
        </Dropdown>

        {/* <Button hidden size="large" shape="round" type="instagram" icon={<CustomIcon name="instagram" />}>
          Connect with Instagram
        </Button> */}

        <Dropdown arrow trigger={['click']} menu={{ items: getItems(LINKEDIN) }}>
          <Button size="large" shape="round" type="linkedin" icon={<CustomIcon name="linkedin" />}>
            {isSocialConnected(LINKEDIN) ? 'Connected' : 'Connect'} with LinkedIn
          </Button>
        </Dropdown>
      </Space>

      <Modal
        width={600}
        closable={false}
        keyboard={false}
        maskClosable={false}
        open={modalConfig.open}
        okText="Connect"
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
