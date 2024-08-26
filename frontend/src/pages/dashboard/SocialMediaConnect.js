import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import CustomIcon from '../../components/CustomIcon';
import { isMobile } from 'react-device-detect';
import { APP_BASEURL } from '../../config-global';
import { SOCIAL_TYPE, SOCIAL_TITLES } from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { notification, Table, Button, Space, Select, Typography, Dropdown, Badge, Checkbox, Modal } from 'antd';
import { StopOutlined, SyncOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { setOriginType, setOriginURL, setEmailForSocialConnect } from '../../reducers/emailsSlice';

import Papa from 'papaparse'; // csv parsing library  

const { Title, Text } = Typography;
const { FACEBOOK, LINKEDIN } = SOCIAL_TYPE;

export default function SocialMediaConnect({
  user,
  className = '',
  showTitle = true,
  update = () => { },
  btnSize = 'large',
  isGuest = false,
  updateParent = () => { }
}) {

  const socialAccounts = user?.socialAccounts || [];
  const getItem = (type) => socialAccounts.find((item) => item.type === type);

  const [loading, setLoading] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeContact, setActiveContact] = useState(null);

  const [emailPostingFrequency, setEmailPostingFrequency] = useState(4);

  const postingOptions = [4, 3, 2, 1].map((value) => ({
    value,
    label: `Post [${value}x] monthly`,
  }));

  const sendContactsToBackend = async (contacts, userEmail, mGmail) => {
    try {
      const response = await axios.post('/contacts',
        {
          contacts,
          userEmail,
          email: mGmail,
          type: 'upload'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to send contacts to backend');
      }
      console.log('Contacts sent successfully:', response.data);
      setContacts(response.data);
    } catch (error) {
      console.error('Failed to send contacts to backend:', error);
    }
  };

  const handleUploadContacts = async () => {
    try {
      const response = await axios.post('/emails', {
        contacts: activeContact.emails.filter(contact => {
          return selectedContacts.includes(contact.contactEmail);
        }),
        userEmail: user.email,
        isGuest,
        frequency: emailPostingFrequency,
        userId: user._id
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.status !== 200) {
        throw new Error('Failed to upload contacts');
      }

      notification.success({
        message: 'Success',
        description: 'Contacts uploaded successfully.'
      });
    } catch (error) {
      console.error('Failed to upload contacts:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to upload contacts.'
      });
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch contacts on page load  
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`/contacts?email=${user.email}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get('error') || '';
  const isConnected = urlParams.get('isConnected') || '0';

  useEffect(() => {
    if (isConnected === '1') {
      notification.success({
        message: 'Success',
        description: 'You have successfully connected your social media account.',
      });
    }

    if (error) notification.error({ message: 'Error', description: error });
  }, [error, isConnected]);

  // isSocialConnected  
  const isSocialConnected = (type) => getItem(type)?.isConnected || false;

  // Get Social Connect Url  
  const getSocialConnectUrl = (type, disconnect = false) => {
    return `${APP_BASEURL}/auth/connect/${type}/${user?.userName}/${disconnect ? 'disconnect' : ''
      }?returnUrl=${window.location.href}`;
  };

  const getConnectIcon = (isConnected = false, size = 14) => {
    return isConnected ? (
      <CheckCircleFilled className="color-0AB6B6" style={{ fontSize: size || 14 }} />
    ) : (
      <CloseCircleFilled className="color-red" style={{ fontSize: size || 14 }} />
    );
  };

  // onPageGroupSelect  
  const onPageGroupSelect = async (type, subType, id, name) => {
    setLoading(true);

    try {
      await axios.get(`users/${user?._id}/connect/${type}/${subType}/${id}`);

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
      await axios.get(`users/${user?._id}/disconnect/${type}`);

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
    const { isConnected = false, page = {} } = item;

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
    const pagesChilds = pages?.length > 1 ? getSubItems(pages, 'page', pageId) : null;

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

  const socialsBtns = [
    {
      key: 'linkedin',
      type: 'social',
      disabled: false,
      title: 'LinkedIn',
      items: getItems(LINKEDIN),
      isConnected: isSocialConnected(LINKEDIN),
    }
  ];

  const readGmail = () => {
    axios.get("/gmail/get-redirect-url").then((response) => {
      const data = response.data;
      if (data.url) {
        dispatch(setOriginURL(window.location.href));
        dispatch(isGuest ? setOriginType('guest') : setOriginType('user'));
        dispatch(setEmailForSocialConnect(user.email));
        window.location.href = data.url;
      }
    });
  };

  const readOutlook = () => {
    axios.get("/outlook/get-redirect-url").then((response) => {
      const data = response.data;
      if (data.url) {
        window.location.href = data.url;
      }
    });
  };

  const handleUploadCSV = (event) => {

    const generateRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }  

    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          sendContactsToBackend(results.data.map((email) => {
            console.log(email);
            return {
              contactName: email.Name,
              contactEmail: email[" Email"],
              sentCount: email[" Sent"],
              receivedCount: email[" Received"]
            }
          }), user.email, "upload" + generateRandomNumber(1, 10000000) + "@upload.com")

          event.target.value = null;
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }


  };

  const columns = [
    {
      key: 'checkbox',
      title: '',
      render: (_, record) => (
        <Checkbox
          checked={selectedContacts.includes(record.contactEmail)}
          onChange={(e) => handleCheckboxChange(e, record.contactEmail)}
        />
      )
    },
    {
      key: 'contactName',
      title: 'Name',
      dataIndex: 'contactName',
      className: 'minw-150px',
      render: (name) => (
        <p>{name}</p>
      )
    },
    {
      key: 'contactEmail',
      title: 'Email',
      className: 'minw-200px',
      dataIndex: 'contactEmail',
      render: (email) => (
        <p>{email}</p>
      )
    },
    {
      key: 'sentCount',
      title: 'Sent',
      dataIndex: 'sentCount',
      className: 'minw-150px',
      render: (sent) => (
        <p>{sent}</p>
      )
    },
    {
      key: 'receivedCount',
      title: 'Received',
      dataIndex: 'receivedCount',
      className: 'minw-150px',
      render: (received) => (
        <p>{received}</p>
      )
    }
  ];

  const handleCheckboxChange = (e, contactEmail) => {
    if (e.target.checked) {
      setSelectedContacts([...selectedContacts, contactEmail]);
    } else {
      setSelectedContacts(selectedContacts.filter(email => email !== contactEmail));
    }
  };

  const handleFrequencyChange = (value) => {
    setEmailPostingFrequency(value);
  };

  const handleModalOpen = (contact) => {
    setActiveContact(contact);
    setSelectedContacts([]);
    setModalVisible(true);
  };

  return (
    <div className={`social-media ${className}`}>
      {showTitle && <Title level={3}>Connect with social media & email</Title>}
      <Space
        size={16}
        direction={isMobile ? 'vertical' : 'horizontal'}
        style={{ width: `calc(100% - ${isMobile ? '1rem' : '0px'})` }}
      >
        {socialsBtns.map(({ key, title, items, disabled, isConnected }) => (
          <Dropdown
            arrow
            key={key}
            placement="top"
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
            <Badge
              className={isMobile && 'w-100'}
              count={getConnectIcon(isConnected, btnSize === 'large' ? 32 : 26)}
            >
              <Button
                type={key}
                shape="round"
                size={btnSize}
                block={isMobile}
                loading={loading}
                disabled={disabled}
                href={getSocialConnectUrl(key)}
                icon={<CustomIcon name={key} />}
                className={isConnected ? 'pointer-none' : ''}
              >
                {isConnected ? 'Connected' : 'Continue'} with {title}
              </Button>
            </Badge>
          </Dropdown>
        ))}

        <button style={{
          padding: '0px',
          borderRadius: '10px',
          border: 'none'
        }} onClick={readGmail}>
          <img src="/svgs/gmail.svg" />
        </button>
        <button style={{
          padding: '0px',
          borderRadius: '10px',
          border: 'none'
        }} onClick={readOutlook}>
          <img src="/svgs/outlook.svg" />
        </button>
        <Button type="primary">
          <label htmlFor="csv-upload" style={{ cursor: 'pointer' }}>Upload CSV</label>
        </Button>
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={handleUploadCSV}
          style={{ display: 'none' }}
        />
      </Space>

      <div style={{ marginTop: '20px' }}>
        {contacts.map(contact => (
          <Button
            key={contact._id}
            type="default"
            onClick={() => handleModalOpen(contact)}
            style={{ margin: '5px' }}
          >
            {contact.name}
          </Button>
        ))}
      </div>

      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        title={activeContact ? activeContact.name : 'Contact Details'}
        width="80%"
      >
        <Table
          columns={columns}
          dataSource={activeContact ? activeContact.emails : []}
          pagination={{ defaultPageSize: 5 }}
          scroll={{ x: '100%' }}
        />

        {isGuest && (
          <div>
            <Select
              size="small"
              value={emailPostingFrequency}
              placeholder="Select"
              options={postingOptions}
              style={{ minWidth: 200, marginTop: '20px' }}
              className={isMobile && 'w-100'}
              onChange={handleFrequencyChange}
            />
          </div>
        )}

        {selectedContacts.length > 0 && (
          <Button
            type="primary"
            onClick={handleUploadContacts}
            style={{ marginTop: '20px' }}
          >
            {isGuest ? 'Run Automation' : 'Upload Selected Contacts'}
          </Button>
        )}
      </Modal>
    </div>
  );
}  