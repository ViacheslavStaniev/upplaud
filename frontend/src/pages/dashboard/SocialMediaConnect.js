import axios from '../../utils/axios';
import CustomIcon from '../../components/CustomIcon';
import { useState, useEffect } from 'react';
import { APP_BASEURL } from '../../config-global';
import { useAuthContext } from '../../auth/AuthProvider';
import { SOCIAL_TYPE, SOCIAL_TITLES } from '../../utils/types';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  StopOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Space, Typography, Dropdown, notification, Badge } from 'antd';

const { Title, Text } = Typography;
const { FACEBOOK, LINKEDIN } = SOCIAL_TYPE;

export default function SocialMediaConnect({ showTitle = true, className = '' }) {
  const { user, update } = useAuthContext();
  const socialAccounts = user?.socialAccounts || [];
  const getItem = (type) => socialAccounts.find((item) => item.type === type);

  const [loading, setLoading] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    // Show Page/Group Selection if not selected
    const fbItem = getItem(FACEBOOK);
    if (fbItem && fbItem?.isConnected && (fbItem?.page?.askToChoose || fbItem.group?.askToChoose)) {
      setOpenDropdown('facebook');
      setOpenKeys([fbItem?.page?.askToChoose ? 'page' : 'group']);
    }

    // Show Page Selection if not selected
    const lnItem = getItem(LINKEDIN);
    if (lnItem && lnItem?.isConnected && lnItem?.page?.askToChoose) {
      setOpenKeys(['page']);
      setOpenDropdown('linkedin');
    }
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const isConnected = urlParams.get('isConnected') || '0';

  useEffect(() => {
    if (isConnected === '1') {
      notification.success({
        message: 'Success',
        description: 'You have successfully connected your social media account.',
      });
    }
  }, [isConnected]);

  // isSocialConnected
  const isSocialConnected = (type) => getItem(type)?.isConnected || false;

  // Get Social Connect Url
  const getSocialConnectUrl = (type, disconnect = false) =>
    `${APP_BASEURL}/auth/connect/${type}/${disconnect ? 'disconnect' : ''}`;

  const getConnectIcon = (isConnected = false) => {
    return isConnected ? (
      <CheckCircleFilled className="color-0AB6B6" />
    ) : (
      <CloseCircleFilled className="color-red" />
    );
  };

  // onPageGroupSelect
  const onPageGroupSelect = async (type, subType, id, name) => {
    setLoading(true);

    try {
      await axios.get(`users/connect/${type}/${subType}/${id}`);

      // Update user
      const newUser = {
        ...user,
        socialAccounts: (user?.socialAccounts || []).map((item) => {
          if (item.type !== type) return item;
          return { ...item, [subType]: { ...item[subType], socialId: id, askToChoose: false } };
        }),
      };

      update({ user: newUser });

      notification.success({
        message: 'Success',
        description: `${subType} "${name}" connected successfully.`,
      });
    } catch (error) {
      console.log(error);
      notification.error({ message: 'Error', description: error?.msg });
    } finally {
      setLoading(false);
    }
  };

  // Account Disconnect
  const onAccountDisconnect = async (type) => {
    setLoading(true);

    try {
      await axios.get(`users/disconnect/${type}`);

      // Update user
      const newUser = {
        ...user,
        socialAccounts: (user?.socialAccounts || []).map((item) =>
          item.type !== type ? item : { ...item, isConnected: false }
        ),
      };

      update({ user: newUser });

      notification.success({
        message: 'Success',
        description: 'Account disconnected successfully.',
      });
    } catch (error) {
      console.log(error);
      notification.error({ message: 'Error', description: error?.msg });
    } finally {
      setOpenDropdown(null);
      setLoading(false);
    }
  };

  // getItems
  const getItems = (type = FACEBOOK) => {
    const item = getItem(type) || {};
    const title = SOCIAL_TITLES[type];
    const key = type === FACEBOOK ? 'facebook' : 'linkedin';
    const { isConnected = false, page = {}, group = {} } = item;

    const LinkItem = ({ subTitle, item }) => {
      const { socialId = '', accounts = [], askToChoose = false } = item || {};
      const subText =
        askToChoose === false && socialId
          ? `(${accounts.find(({ id }) => id === socialId)?.name})`
          : '';

      const noAccounts = accounts?.length === 0 && item;

      return (
        <Text className="capitalize">
          {title} {subTitle} {subText} {noAccounts && item && '(No accounts found)'}
        </Text>
      );
    };

    const getSubItems = (accounts = [], subType = '', choosenId = null) => {
      const items = accounts?.map(({ id, name }) => ({
        key: id,
        label: name,
        icon: choosenId === id ? <CheckCircleFilled /> : null,
        onClick: () => onPageGroupSelect(type, subType, id, name),
        className: choosenId === id ? 'pointer-none color-white color-0AB6B6 bg-F4F6F8' : '',
      }));
      return [
        { key: 'header', type: 'group', label: `Select ${subType} for automation` },
        ...items,
      ];
    };

    const { accounts: pages = [], socialId: pageId = '' } = page;
    const { accounts: groups = [], socialId: groupId = '' } = group;
    const pagesChilds = pages?.length > 1 ? getSubItems(pages, 'page', pageId) : null;
    const groupChilds = groups?.length > 1 ? getSubItems(groups, 'group', groupId) : null;

    const items = [
      {
        key: 'profile',
        className: 'pointer-none',
        icon: getConnectIcon(isConnected),
        label: <LinkItem subTitle="Profile" />,
      },
      {
        key: 'page',
        children: pagesChilds,
        disabled: page?.accounts?.length === 0,
        className: pagesChilds ? '' : 'pointer-none',
        label: <LinkItem subTitle="Page" item={page} />,
        icon: getConnectIcon(isConnected && pageId && page?.askToChoose === false),
      },
      {
        key: 'group',
        children: groupChilds,
        disabled: group?.accounts?.length === 0,
        className: groupChilds ? '' : 'pointer-none',
        label: <LinkItem subTitle="Group" item={group} />,
        icon: getConnectIcon(isConnected && groupId && group?.askToChoose === false),
      },
    ];

    return [
      {
        type: 'group',
        key: 'account',
        label: 'Connected Accounts',
        children: type === FACEBOOK ? items : items.filter((item) => item.key !== 'group'),
      },
      {
        key: 'divider',
        type: 'divider',
      },
      {
        key: 'reconect-disconnnect',
        label: (
          <div className="flex-item">
            <Button block danger icon={<StopOutlined />} onClick={() => onAccountDisconnect(type)}>
              Disconnect
            </Button>
            <Button block type={key} icon={<SyncOutlined />} href={getSocialConnectUrl(key)}>
              Reconnect
            </Button>
          </div>
        ),
      },
    ];
  };

  // socialsBtns
  const socialsBtns = [
    {
      key: 'facebook',
      disabled: false,
      title: 'Facebook',
      items: getItems(FACEBOOK),
      isConnected: isSocialConnected(FACEBOOK),
    },
    {
      key: 'linkedin',
      disabled: false,
      title: 'LinkedIn',
      items: getItems(LINKEDIN),
      isConnected: isSocialConnected(LINKEDIN),
    },
  ];

  return (
    <div className={`social-media ${className}`}>
      {showTitle && <Title level={3}>Connect with social media</Title>}

      <Space size={16}>
        {socialsBtns.map(({ key, title, items, disabled, isConnected }) => (
          <Dropdown
            arrow
            key={key}
            disabled={!isConnected}
            open={openDropdown === key}
            menu={{ items, defaultOpenKeys: openKeys }}
            onOpenChange={(open) => {
              if (!open && openKeys.length) {
                setOpenKeys([]);
                setTimeout(() => setOpenDropdown(open ? key : null), 120);
              } else setOpenDropdown(open ? key : null);
            }}
          >
            <Badge count={getConnectIcon(isConnected)}>
              <Button
                type={key}
                size="large"
                shape="round"
                loading={loading}
                disabled={disabled}
                href={getSocialConnectUrl(key)}
                icon={<CustomIcon name={key} />}
                className={isConnected ? 'pointer-none' : ''}
              >
                {isConnected ? 'Connected' : 'Connect'} with {title}
              </Button>
            </Badge>
          </Dropdown>
        ))}

        {/* <Button hidden size="large" shape="round" type="instagram" icon={<CustomIcon name="instagram" />}>
          Connect with Instagram
        </Button> */}
      </Space>
    </div>
  );
}
