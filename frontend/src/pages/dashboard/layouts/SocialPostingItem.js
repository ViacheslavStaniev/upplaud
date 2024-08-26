import Accordian from '../../../components/Accordian';
import { isMobile } from 'react-device-detect';
import { getSocialLabel } from '../../../utils/common';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Table, Button, Checkbox, Select, Form, Alert, Tooltip } from 'antd';
import { notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../../auth/AuthProvider';
import axios from '../../../utils/axios';

export default function SocialPostingItem({ selectedEmailsFromProps, emailFrequencyFromProps }) {

  const form = Form.useFormInstance();
  const socialItems = Form.useWatch('socials', form) || [];
  const emailPostingFrequency = Form.useWatch('emailFrequency', form); // Remove default value here  

  const { user, update, isLoading, updateUser } = useAuthContext();

  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);

  useEffect(() => {
    setSelectedEmails(selectedEmailsFromProps);
  }, [selectedEmailsFromProps])

  useEffect(() => {
    // Fetch contacts data  

    const fetchEmails = async () => {
      try {
        const response = await axios.get(`/emails?email=${user.email}`);
        if (response.status === 200) {
          setEmails(response.data);
        } else {
          throw new Error('Failed to fetch contacts.');
        }
      } catch (error) {
        console.error(error);
        notification.error({ message: 'Error', description: error.message });
      }
    };

    fetchEmails();
  }, []);

  const postingOptions = [4, 3, 2, 1].map((value) => ({
    value,
    label: `Post [${value}x] monthly`,
  }));

  const onChangeSet = (_id, field, value) => {
    const items = socialItems.map((item) =>
      item._id === _id ? { ...item, [field]: value } : item
    );

    form.setFieldValue('socials', items);
  };

  const handleCheckboxChange = (checked, email) => {
    if (checked) {
      form.setFieldValue('selectedEmails', [...selectedEmails, email]);
      setSelectedEmails((prevSelected) => [...prevSelected, email]);
    } else {
      const updatedSelectedEmails = selectedEmails.filter((selectedEmail) => selectedEmail !== email);
      form.setFieldValue('selectedEmails', updatedSelectedEmails);
      setSelectedEmails(updatedSelectedEmails);
    }
  };

  const handleFrequencyChange = (value) => {
    // Store email posting frequency in the form field.  
    form.setFieldValue('emailFrequency', value);
  };

  const hasSocials = socialItems.length > 0;
  const items = [
    {
      key: 'social',
      label: 'Confirm Socials & Posting Frequency',
      children: (
        <div className="flex-item gap-1 flex-column align-baseline">
          <Form.Item name="socials" hidden>
            <input />
          </Form.Item>

          {hasSocials &&
            socialItems.map(
              ({ _id, type, subType, subTypeName = '', isActive, frequency, isConnected }) => (
                <div
                  key={_id}
                  className={`flex-item gap-1 flex-auto ${isMobile && 'flex-column w-100'}`}
                >
                  <Checkbox
                    checked={isActive}
                    disabled={!isConnected}
                    className={`uppercase ${isMobile && 'w-100'}`}
                    onChange={(e) => onChangeSet(_id, 'isActive', e.target.checked)}
                  >
                    {getSocialLabel(type, subType, subTypeName)}
                  </Checkbox>
                  <Select
                    size="small"
                    defaultValue={4}
                    value={frequency}
                    placeholder="Select"
                    disabled={!isConnected}
                    options={postingOptions}
                    style={{ minWidth: 200 }}
                    className={isMobile && 'w-100'}
                    onChange={(value) => onChangeSet(_id, 'frequency', value)}
                  />

                  {!isConnected && (
                    <Tooltip
                      color="red"
                      arrow={false}
                      title="Please connect your social account to enable this automation."
                    >
                      <Button
                        danger
                        type="text"
                        size="small"
                        shape="circle"
                        block={isMobile}
                        icon={<InfoCircleOutlined />}
                      >
                        Account Disconnected{' '}
                      </Button>
                    </Tooltip>
                  )}
                </div>
              )
            )}

          {!hasSocials && (
            <Alert
              showIcon
              style={{ fontWeight: 600 }}
              message="No social media accounts found. Please connect your social media accounts first."
            />
          )}
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Emails Posting Frequency',
      children: (
        <div className="flex-item gap-1 flex-column align-baseline">
          <Form.Item name="emails" hidden>
            <input />
          </Form.Item>
          <Form.Item name="selectedEmails" hidden>
            <input />
          </Form.Item>
          <Form.Item name="emailFrequency" hidden>
            <input />
          </Form.Item>

          {emails.length !== 0 && (
            <>
              <Table
                style={{
                  marginTop: '20px',
                  width: '100%'
                }}
                columns={[
                  {
                    key: 'select',
                    title: 'Select',
                    render: (record) => (
                      <Checkbox
                        checked={selectedEmails.includes(record.contactEmail)} // Reflect initial selection  
                        onChange={(e) => handleCheckboxChange(e.target.checked, record.contactEmail)}
                      />
                    ),
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
                ]}
                dataSource={emails}
                pagination={{ defaultPageSize: 5 }}
                scroll={{ x: '100%' }}
              />
              <Select
                size="small"
                defaultValue={emailFrequencyFromProps}  // Reflect initial email frequency from props  
                value={emailPostingFrequency}
                placeholder="Select"
                options={postingOptions}
                style={{ minWidth: 200 }}
                className={isMobile && 'w-100'}
                onChange={handleFrequencyChange}
              />
            </>
          )}

          {emails.length === 0 && (
            <Alert
              showIcon
              style={{ fontWeight: 600 }}
              message="No contacts emails"
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <Accordian items={items} defaultActive="social" marginBottom={false} />
  );
}