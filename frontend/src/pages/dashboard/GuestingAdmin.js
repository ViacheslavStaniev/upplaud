import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthContext } from '../../auth/AuthProvider';
import { getShowsList } from '../../reducers/guestsSlice';
import { Button, Typography, Space, Table, Tag, Popconfirm } from 'antd';
import { EditOutlined, LinkOutlined, DeleteOutlined, PauseCircleOutlined } from '@ant-design/icons';
import AppTitle from '../../components/AppTitle';

const { Text, Title } = Typography;

export default function GuestingAdmin() {
  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState([]);
  const totalSelected = selectedRows.length;

  const { user } = useAuthContext();
  const { shows = [] } = useSelector((state) => state.guests);
  console.log(shows);

  useEffect(() => {
    dispatch(getShowsList(user?._id));
  }, [user?._id, dispatch]);

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'SHOW NAME',
      render: (name) => <Text strong>{name}</Text>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      key: 'host',
      title: 'HOST',
      dataIndex: 'host',
      sorter: (a, b) => a.host.localeCompare(b.host),
    },
    {
      key: 'status',
      title: 'STATUS',
      align: 'center',
      dataIndex: 'status',
      render: ({ type, text }) => <Tag color={type}>{text}</Tag>,
    },
    {
      key: 'recordingDate',
      title: 'RECORDING DATE',
      dataIndex: 'recordingDate',
      sorter: (a, b) => a.recordingDate - b.recordingDate,
      render: (timestamp) => <Text type="secondary">{getDateString(timestamp)}</Text>,
    },
    {
      key: 'subs',
      dataIndex: 'subs',
      title: 'SUBMISSION',
      render: ({ g = 0, h = 0, n = 0 }) => (
        <Text strong>
          G: {g} H: {h} N:{n}
        </Text>
      ),
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, record) => (
        <Space>
          <Button icon={<LinkOutlined />} />
          <Button icon={<EditOutlined />} />
          <Button icon={<PauseCircleOutlined />} />
          <Popconfirm
            placement="topLeft"
            title="Are you sure?"
            description="This action can't be undone."
            onConfirm={console.log}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const randomPost = () => Math.floor(Math.random() * 5);
  const getDateString = (timestamp) => new Date(timestamp).toDateString();
  const randomDate = () => new Date(new Date() - Math.random() * 1e12).getTime();

  const data = ['Tikam Chand', 'Suraj Kumar Jha', 'John Doe', 'Bhupendra Kumar'].map(
    (name, id) => ({
      host: name,
      id: `user_${id}`,
      key: `user_${id}`,
      name: "Tikam's Show",
      recordingDate: randomDate(),
      status: { type: 'error', text: 'Not Automated' },
      subs: { g: randomPost(), h: randomPost(), n: randomPost() },
    })
  );

  const tableTitle = () => {
    return (
      <div
        className={`flex-item space-between w-100 p-1 pl-2 pr-2 br-5px ${
          totalSelected === 0 ? 'bg-white visibility-hidden' : 'bg-E1BBE1'
        }`}
      >
        <Text strong className="color-5D0578 font-16px">
          {totalSelected} selected
        </Text>
        <Space>
          <Popconfirm
            placement="topLeft"
            title="Are you sure?"
            description={
              <Text>
                This action can't be undone. <br /> All the selected entries will be deleted.
              </Text>
            }
            onConfirm={console.log}
          >
            <Button type="text" className="color-5D0578" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      </div>
    );
  };

  return (
    <>
      <AppTitle title="Guesting Admin" />

      <div className="guesting-admin">
        <Title className="m-0 mb-1">Guesting Admin</Title>

        <div className="flex-item mb-1">
          <Title level={5} className="m-0 mb-4 fw-400 color-45485C flex-auto">
            Here you can track the automation of your show appearances:
          </Title>

          <Button type="info" shape="round" size="large">
            ADD SHOW
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          title={tableTitle}
          pagination={{ defaultPageSize: 5 }}
          rowSelection={{ type: 'checkbox', onChange: (_, rows) => setSelectedRows(rows) }}
        />
      </div>
    </>
  );
}
