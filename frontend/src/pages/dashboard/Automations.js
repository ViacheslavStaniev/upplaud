import { useState, useEffect } from 'react';
import { POLL_STATUS } from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { getGuestsList, deleteGuest, deleteManyGuests } from '../../reducers/guestsSlice';
import { getRandomColor, getDateString, pollTypeOptions, downloadVotes } from '../../utils/common';
import {
  Tag,
  Tabs,
  Modal,
  Space,
  Table,
  Badge,
  Button,
  Tooltip,
  Popover,
  Typography,
  Popconfirm,
} from 'antd';
import {
  EditOutlined,
  MailOutlined,
  DeleteOutlined,
  // FileTextOutlined,
  PauseCircleOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import AppTitle from '../../components/AppTitle';

const { PUBLISHED } = POLL_STATUS;
const { Text, Title, Paragraph } = Typography;

export default function Automations() {
  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState([]);
  const [voteDetails, setVoteDetails] = useState(null);

  const totalSelected = selectedRows.length;
  const { guests = [], isLoading = false } = useSelector((state) => state.guests);

  useEffect(() => {
    dispatch(getGuestsList());
  }, [dispatch]);

  console.log('guests', guests);

  const isSocialAccountActive = (socials = []) => {
    return socials.reduce((y, { isActive }) => (y ? y : isActive), false);
  };

  const columns = [
    {
      key: 'name',
      title: 'NAME',
      dataIndex: 'name',
      render: (name, record) => (
        <Space className={!record.guest ? 'disabled' : ''}>
          <Badge color={getRandomColor()} count={name.charAt()} />

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
      key: 'statusObj',
      // align: 'center',
      dataIndex: 'statusObj',
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
      key: 'votes',
      title: 'VOTES',
      dataIndex: 'votes',
      sorter: (a, b) => a.votes?.length - b.votes?.length,
      render: (votes) =>
        // <Tooltip title="View Votes">
        //   <Button
        //     shape="round"
        //     icon={<FileTextOutlined />}
        //     onClick={() => setVoteDetails(votes)}
        //     type={!votes?.length ? 'text' : 'default'}
        //     className={!votes?.length ? 'pointer-none' : ''}
        //   >
        `Total Votes (${votes?.length})`,
      //   </Button>
      // </Tooltip>
    },
    { key: 'todo', title: 'TASK TO DO', dataIndex: 'todo' },
    {
      key: 'action',
      title: 'Action',
      render: ({ id, isActive, votes }) => (
        <Space>
          <Tooltip title="Re-Send Invitation Email">
            <Button disabled icon={<MailOutlined />} />
          </Tooltip>
          <Tooltip title="Edit Automation Details">
            <Button href={`/automations/${id}`} icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title={`${isActive ? 'Pause' : 'Active'} Automation`}>
            <Button danger={isActive} icon={<PauseCircleOutlined />} />
          </Tooltip>
          <Tooltip title="Download Voting Data">
            <Button
              disabled={!votes?.length}
              icon={<CloudDownloadOutlined />}
              onClick={() => {
                downloadVotes(votes);
              }}
            />
          </Tooltip>
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
      ),
    },
  ];

  const getDataSource = (key) => {
    return guests
      .filter(({ guestType }) => guestType === key)
      .map(({ _id, guest, status, socials, recordingDate, votes }) => ({
        votes,
        guest,
        status,
        id: _id,
        key: _id,
        todo: '',
        statusObj: { guest: null, host: null },
        recordingDate: new Date(recordingDate).getTime(),
        name: guest ? `${guest.firstName} ${guest.lastName}` : '--',
        isActive: status === PUBLISHED && isSocialAccountActive(socials),
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

      <VoteDetails votes={voteDetails} onClose={() => setVoteDetails(false)} />
    </>
  );
}

function VoteDetails({ votes = [], onClose }) {
  const columns = [
    { title: '#', dataIndex: 'index' },
    { title: 'Selected Topic', dataIndex: 'topic' },
    Table.EXPAND_COLUMN,
    { title: 'Suggestion', dataIndex: 'suggestion' },
    { title: 'Voter', dataIndex: 'voter' },
    { title: 'Timestamp', dataIndex: 'createdAt' },
  ];
  const dataSource = (votes || []).map((vote, i) => {
    const { _id, createdAt, selectedTopic, suggestions, isSuggestion } = vote;

    return {
      ...vote,
      key: _id,
      index: i + 1,
      createdAt: getDateString(createdAt),
      topic: (
        <Popover
          title="Suggestions"
          open={isSuggestion ? null : false}
          content={
            <div className="topic-suggestion">
              <Paragraph className="m-0">
                Topic: <Text strong>{suggestions?.topic}</Text>
              </Paragraph>
              <Paragraph className="m-0">
                Speaker: <Text strong>{suggestions?.speaker || '--'}</Text>
              </Paragraph>
            </div>
          }
        >
          <Tag bordered={!isSuggestion}>{selectedTopic?.topic || 'OTHER'}</Tag>
        </Popover>
      ),

      suggestion: 'hello',
    };
  });

  return (
    <Modal
      width={800}
      footer={null}
      open={!!votes}
      onCancel={onClose}
      title={`Voting Details (${votes?.length})`}
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: (record) => record?.questionnaireAnswers?.length > 0,
        }}
      />
    </Modal>
  );
}
