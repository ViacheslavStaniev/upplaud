import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import { POLL_STATUS, SOCIAL_TYPE } from '../../utils/types';
import {
  updatePoll,
  updateState,
  deleteGuest,
  getGuestsList,
  deleteManyGuests,
  resendEmailInvite,
} from '../../reducers/guestsSlice';
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
  notification,
} from 'antd';
import {
  LikeOutlined,
  EditOutlined,
  MailOutlined,
  DeleteOutlined,
  // FileTextOutlined,
  PauseCircleOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import AppTitle from '../../components/AppTitle';
import CustomIcon from '../../components/CustomIcon';
import AutomationCongrats from './layouts/AutomationCongrats';

const { DRAFT, PUBLISHED } = POLL_STATUS;
const { FACEBOOK, LINKEDIN } = SOCIAL_TYPE;
const { Text, Title, Paragraph } = Typography;

export default function Automations() {
  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState([]);
  const [voteDetails, setVoteDetails] = useState(null);
  const [automationCongrats, setAutomationCongrats] = useState(null);

  const totalSelected = selectedRows.length;
  const { guests = [], isLoading = false } = useSelector((state) => state.guests);

  useEffect(() => {
    dispatch(getGuestsList());
  }, [dispatch]);

  const congratsGuest = guests.find(({ _id }) => _id === automationCongrats);

  const isSocialAccountActive = (socials = []) => {
    return socials.reduce((y, { isActive }) => (y ? y : isActive), false);
  };

  const columns = [
    {
      key: 'name',
      title: 'NAME',
      dataIndex: 'name',
      className: 'minw-150px',
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
      className: 'minw-200px',
      dataIndex: 'recordingDate',
      sorter: (a, b) => a.recordingDate - b.recordingDate,
      render: (timestamp) => <Text className="color-5D0578">{getDateString(timestamp)}</Text>,
    },
    {
      key: 'votes',
      title: 'VOTES',
      dataIndex: 'votes',
      className: 'minw-150px',
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
    {
      align: 'center',
      key: 'sconnecctors',
      title: 'Social Connections',
      render: ({ sconnecctors }) => {
        const data = [
          {
            key: FACEBOOK,
            slug: 'facebook',
            isConnected: sconnecctors[FACEBOOK] || false,
          },
          {
            key: LINKEDIN,
            slug: 'linkedin',
            isConnected: sconnecctors[LINKEDIN] || false,
          },
        ];

        return (
          <div className="flex-item gap-1 flex-center">
            {data.map(({ key, slug, isConnected }) => (
              <Tooltip key={key} title={isConnected ? 'Connected' : 'Not Connected'}>
                <Badge key={key} dot color={isConnected ? 'blue' : 'red'}>
                  <Button
                    type="ghost"
                    shape="circle"
                    className={`color-${slug}`}
                    icon={<CustomIcon name={slug} />}
                  />
                </Badge>
              </Tooltip>
            ))}
          </div>
        );
      },
    },
    {
      key: 'action',
      title: 'Action',
      render: ({ id, votes, status, isPublished }) => (
        <Space>
          <Tooltip title="Congrats & Details">
            <Button
              icon={<LikeOutlined />}
              disabled={!isPublished}
              onClick={() => setAutomationCongrats(id)}
            />
          </Tooltip>
          <EmailInviteResendBtn id={id} />
          <Tooltip title="Edit Automation Details">
            <Button href={`/automations/${id}`} icon={<EditOutlined />} />
          </Tooltip>
          <StatueUpdateBtn
            id={id}
            status={status}
            isPublished={isPublished}
            onSuccess={(updateConfig) => {
              dispatch(
                updateState({
                  guests: guests.map((g) => (g?._id === id ? { ...g, ...updateConfig } : g)),
                })
              );
            }}
          />
          <Tooltip title="Download Voting Data">
            <Button
              disabled={!votes?.length}
              icon={<CloudDownloadOutlined />}
              onClick={() => downloadVotes(votes)}
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
        isPublished: status === PUBLISHED,
        statusObj: { guest: null, host: null },
        recordingDate: new Date(recordingDate).getTime(),
        name: guest ? `${guest.firstName} ${guest.lastName}` : '--',
        isActive: status === PUBLISHED && isSocialAccountActive(socials),
        sconnecctors: guest?.socialAccounts?.reduce(
          (y, { type, isConnected }) => ({ ...y, [type]: isConnected }),
          {
            [FACEBOOK]: false,
            [LINKEDIN]: false,
          }
        ),
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
          scroll={{ x: '100%' }}
          rowSelection={{ type: 'checkbox', onChange: (_, rows) => setSelectedRows(rows) }}
        />
      ),
    };
  });

  return (
    <>
      <AppTitle title="Automations" />

      <div className="account-admin">
        <Title level={isMobile ? 3 : 1} className="m-0 mb-1">
          Automations
        </Title>

        <div className={`flex-item ${isMobile && 'flex-column'}`}>
          <Title
            level={5}
            className={`m-0 fw-400 color-45485C flex-auto ${isMobile ? 'mb-2' : 'mb-4'}`}
          >
            Manage the automations of your guests & track the numbers of votes from your Guest (G),
            your connections (H), or Neither (N). You can also export voters’ email addresses, topic
            suggestions, referral names, etc.
          </Title>

          <Button block={isMobile} type="info" shape="round" size="large">
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

      <Modal
        footer={null}
        open={!!congratsGuest}
        width={'min(90%, 820px)'}
        title="Automation Congrats & Details"
        onCancel={() => setAutomationCongrats(null)}
      >
        {congratsGuest && <AutomationCongrats guest={congratsGuest} />}
      </Modal>
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

function EmailInviteResendBtn({ id }) {
  const [loading, setLoading] = useState(false);

  // Re-Send email invites
  const onResendEmailInvite = () => {
    setLoading(true);

    resendEmailInvite(id)
      .then(() => notification.success({ message: 'Invite email re-sent successfully.' }))
      .catch(() => notification.error({ message: 'Unable to send invite. Please try again.' }))
      .finally(() => setLoading(false));
  };

  return (
    <Tooltip title="Re-Send Invitation Email">
      <Button icon={<MailOutlined />} loading={loading} onClick={onResendEmailInvite} />
    </Tooltip>
  );
}

function StatueUpdateBtn({ id, status = DRAFT, isPublished = false, onSuccess }) {
  const [loading, setLoading] = useState(false);

  // Update Statsu
  const onStatusUpdate = () => {
    setLoading(true);

    const updateConfig = { status: status === DRAFT ? PUBLISHED : DRAFT };

    updatePoll(id, updateConfig)
      .then(() => {
        onSuccess(updateConfig);
        notification.success({ message: 'Status updated successfully.' });
      })
      .catch(() => notification.error({ message: 'Unable to update. Please try again.' }))
      .finally(() => setLoading(false));
  };

  return (
    <Tooltip title={`${isPublished ? 'Pause' : 'Active'} Automation`}>
      <Button
        danger={isPublished}
        icon={<PauseCircleOutlined />}
        loading={loading}
        onClick={onStatusUpdate}
      />
    </Tooltip>
  );
}
