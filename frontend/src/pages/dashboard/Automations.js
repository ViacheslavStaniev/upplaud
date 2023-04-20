import { useState } from "react";
import { getRandomColor } from "../../utils/common";
import { Avatar, Button, Typography, Space, Table, Tag, Popconfirm } from "antd";
import {
  EditOutlined,
  MailOutlined,
  DeleteOutlined,
  SettingOutlined,
  FileTextOutlined,
  CalendarOutlined,
  PauseCircleOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import AppTitle from "../../components/AppTitle";

export default function Automations() {
  const { Text, Title } = Typography;

  const [selectedRows, setSelectedRows] = useState([]);
  const totalSelected = selectedRows.length;
  // console.log("selectedRows: ", selectedRows, totalSelected);

  const columns = [
    {
      key: "name",
      title: "NAME",
      dataIndex: "name",
      render: (name) => (
        <Space>
          <Avatar size='small' style={{ backgroundColor: getRandomColor() }}>
            {name.charAt()}
          </Avatar>
          <Text strong>{name}</Text>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      key: "recordingDate",
      title: "RECORDING DATE",
      dataIndex: "recordingDate",
      sorter: (a, b) => a.recordingDate - b.recordingDate,
      render: (timestamp) => <Text className='color-5D0578'>{getDateString(timestamp)}</Text>,
    },
    {
      title: "STATUS",
      key: "status",
      align: "center",
      dataIndex: "status",
      render: ({ guest, host }) => (
        <Space direction='vertical'>
          <Tag
            color='rgb(184 209 196 / 20%)'
            style={{ margin: 0, color: "#6E8D7D", padding: "10px 20px", fontSize: 16, borderRadius: 25 }}
          >
            Guest {guest.posted} {getDateString(guest.date)}
          </Tag>
          <Tag
            color='rgb(41 127 184 / 10%)'
            style={{ margin: 0, color: "#297FB8", padding: "10px 20px", fontSize: 16, borderRadius: 25 }}
          >
            Host {host.posted} {getDateString(host.date)}
          </Tag>
        </Space>
      ),
    },
    {
      key: "asqs",
      title: "ASQs",
      dataIndex: "asqs",
      render: ({ g = 0, h = 0, n = 0 }) => (
        <Space direction='vertical'>
          <Tag color='green'>G: {g}</Tag>
          <Tag color='cyan'>H: {h}</Tag>
          <Tag color='lime'>N: {n}</Tag>
        </Space>
      ),
    },
    {
      key: "todo",
      title: "TASK TO DO",
      dataIndex: "todo",
      sorter: (a, b) => a.todo.localeCompare(b.todo),
    },
    {
      key: "action",
      title: "Action",
      render: (_, record) => (
        <Space direction='vertical'>
          <Space>
            <Button icon={<MailOutlined />} />
            <Button icon={<EditOutlined />} />
            <Button icon={<CalendarOutlined />} />
            <Button icon={<PauseCircleOutlined />} />
          </Space>
          <Space>
            <Button icon={<CloudDownloadOutlined />} />
            <Button icon={<SettingOutlined />} />
            <Button icon={<FileTextOutlined />} />
            <Popconfirm placement='topLeft' title='Are you sure?' description="This action can't be undone." onConfirm={console.log}>
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        </Space>
      ),
    },
  ];

  const randomPost = () => Math.floor(Math.random() * 5);
  const getDateString = (timestamp) => new Date(timestamp).toDateString();
  const randomDate = () => new Date(new Date() - Math.random() * 1e12).getTime();

  const data = [
    "Tikam Chand",
    "Suraj Kumar Jha",
    "John Doe",
    "Bhupendra Kumar",
    "Jivansh Meghwanshi",
    "Radheysham P",
    "Vikram Rajan",
    "Ankit Sharma",
  ].map((name, id) => ({
    name,
    id: `user_${id}`,
    key: `user_${id}`,
    recordingDate: randomDate(),
    status: {
      guest: { posted: randomPost(), date: randomDate() },
      host: { posted: randomPost(), date: randomDate() },
    },
    asqs: { g: randomPost(), h: randomPost(), n: randomPost() },
    todo: "",
  }));

  const tableTitle = () => {
    return (
      <div
        className={`flex-item space-between w-100 p-1 pl-2 pr-2 br-5px ${
          totalSelected === 0 ? "bg-white visibility-hidden" : "bg-E1BBE1"
        }`}
      >
        <Text strong className='color-5D0578 font-16px'>
          {totalSelected} selected
        </Text>
        <Space>
          <Popconfirm
            placement='topLeft'
            title='Are you sure?'
            description={
              <Text>
                This action can't be undone. <br /> All the selected entries will be deleted.
              </Text>
            }
            onConfirm={console.log}
          >
            <Button type='text' className='color-5D0578' icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      </div>
    );
  };

  return (
    <>
      <AppTitle title='Automations' />

      <div className='account-admin'>
        <Title className='m-0 mb-1'>Automations</Title>

        <div className='flex-item'>
          <Title level={5} className='m-0 mb-4 fw-400 color-45485C flex-auto'>
            Here you can manage the automation of your guests & track the number of audience submissions connected to your Guest, Host
            (you), or Neither. You can also export the Submissions for each guest, featuring participants’ names, emails, questions &
            Audio Ask files.
          </Title>

          <Button type='info' shape='round' size='large'>
            REMIND INVITES
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          title={tableTitle}
          pagination={{ defaultPageSize: 5 }}
          rowSelection={{ type: "checkbox", onChange: (_, rows) => setSelectedRows(rows) }}
        />
      </div>
    </>
  );
}
