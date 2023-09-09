import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthContext } from '../../auth/AuthProvider';
import { getRandomColor, getDateString, pollTypeOptions } from '../../utils/common';
import { getGuestsList, deleteGuest, deleteManyGuests } from '../../reducers/guestsSlice';
import { Avatar, Button, Typography, Space, Table, Tag, Popconfirm, Tooltip, Tabs } from 'antd';
import {
  EditOutlined,
  MailOutlined,
  DeleteOutlined,
  SettingOutlined,
  FileTextOutlined,
  CalendarOutlined,
  PauseCircleOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import AppTitle from '../../components/AppTitle';

const { Text, Title } = Typography;

export default function Automations() {
  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState([]);
  const totalSelected = selectedRows.length;

  const { user } = useAuthContext();
  const { guests = [], isLoading = false } = useSelector((state) => state.guests);

  useEffect(() => {
    dispatch(getGuestsList(user.show?._id));
  }, [user.show?._id, dispatch]);

  const columns = [
    {
      key: 'name',
      title: 'NAME',
      dataIndex: 'name',
      render: (name, record) => (
        <Space className={!record.guest ? 'disabled' : ''}>
          <Avatar size="small" style={{ backgroundColor: getRandomColor() }}>
            {name.charAt()}
          </Avatar>
          <Text strong>{name}</Text>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      key: 'recordingDate',
      title: 'RECORDING DATE',
      dataIndex: 'recordingDate',
      sorter: (a, b) => a.recordingDate - b.recordingDate,
      render: (timestamp) => <Text className="color-5D0578">{getDateString(timestamp)}</Text>,
    },
    {
      title: 'STATUS',
      key: 'status',
      // align: 'center',
      dataIndex: 'status',
      render: ({ guest, host }) => (
        <div className="flex-item gap-1">
          <Tag
            color="rgb(184 209 196 / 20%)"
            style={{
              margin: 0,
              color: '#6E8D7D',
              padding: '10px 20px',
              fontSize: 16,
              borderRadius: 25,
            }}
          >
            Guest
            {guest ? (
              <Text>
                {guest.posted} {getDateString(guest.date)}
              </Text>
            ) : (
              '--'
            )}
          </Tag>
          <Tag
            color="rgb(41 127 184 / 10%)"
            style={{
              margin: 0,
              color: '#297FB8',
              padding: '10px 20px',
              fontSize: 16,
              borderRadius: 25,
            }}
          >
            Host
            {host ? (
              <Text>
                {host.posted} {getDateString(host.date)}
              </Text>
            ) : (
              '--'
            )}
          </Tag>
        </div>
      ),
    },
    {
      key: 'asqs',
      title: 'VOTES',
      dataIndex: 'asqs',
      render: ({ g = 0, h = 0, n = 0 }) => (
        <div className="flex-item gap-1">
          <Tag color="green">G: {g}</Tag>
          <Tag color="cyan">H: {h}</Tag>
          <Tag color="lime">N: {n}</Tag>
        </div>
      ),
    },
    {
      key: 'todo',
      title: 'TASK TO DO',
      dataIndex: 'todo',
      sorter: (a, b) => a.todo.localeCompare(b.todo),
    },
    {
      key: 'action',
      title: 'Action',
      render: ({ id }) => (
        <Space direction="vertical">
          <Space>
            <Button icon={<MailOutlined />} />
            <Tooltip title="Edit Automation Details">
              <Button href={`/new-automation/${id}`} icon={<EditOutlined />} />
            </Tooltip>
            <Button icon={<CalendarOutlined />} />
            <Button icon={<PauseCircleOutlined />} />
          </Space>
          <Space>
            <Button icon={<CloudDownloadOutlined />} />
            <Button icon={<SettingOutlined />} />
            <Button icon={<FileTextOutlined />} />
            <Popconfirm
              placement="topLeft"
              title="Are you sure?"
              description="This action can't be undone."
              onConfirm={() => dispatch(deleteGuest(id))}
            >
              <Tooltip title="Delete">
                <Button icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
          </Space>
        </Space>
      ),
    },
  ];

  const getDataSource = (key) => {
    return guests
      .filter(({ guestType }) => guestType === key)
      .map(({ _id, guest, recordingDate }) => ({
        guest,
        id: _id,
        key: _id,
        status: { guest: null, host: null },
        recordingDate: new Date(recordingDate).getTime(),
        name: guest ? `${guest.firstName} ${guest.lastName}` : '--',
        asqs: { g: 0, h: 0, n: 0 },
        todo: '',
      }));
  };

  const SelectedItemsAction = () => {
    if (totalSelected === 0) return null;

    return (
      <div className="flex-item br-5px gap-2">
        <Text strong className="font-16px" type="danger">
          {totalSelected} Automation{totalSelected > 1 ? 's' : ''} Selected
        </Text>

        <Popconfirm
          placement="topLeft"
          title="Are you sure?"
          okButtonProps={{ danger: true }}
          description="All the selected entries will be deleted."
          onConfirm={() => dispatch(deleteManyGuests(selectedRows.map((row) => row.id)))}
        >
          <Button danger type="primary" icon={<DeleteOutlined />} />
        </Popconfirm>
      </div>
    );
  };

  const items = pollTypeOptions.map(({ key, label }) => {
    return {
      key,
      label,
      children: (
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={getDataSource(key)}
          pagination={{ defaultPageSize: 5 }}
          rowSelection={{ type: 'checkbox', onChange: (_, rows) => setSelectedRows(rows) }}
        />
      ),
    };
  });

  return (
    <>
      <AppTitle title="Automations" />

      <div className="account-admin">
        <Title className="m-0 mb-1">Automations</Title>

        <div className="flex-item">
          <Title level={5} className="m-0 mb-4 fw-400 color-45485C flex-auto">
            Manage the automations of your guests & track the numbers of votes from your Guest (G),
            your connections (H), or Neither (N). You can also export voters’ email addresses, topic
            suggestions, referral names, etc.
          </Title>

          <Button type="info" shape="round" size="large">
            REMIND INVITES
          </Button>
        </div>

        <Tabs
          items={items}
          defaultActiveKey={pollTypeOptions[0]?.key}
          tabBarExtraContent={{ right: <SelectedItemsAction /> }}
        />
      </div>
    </>
  );
}
