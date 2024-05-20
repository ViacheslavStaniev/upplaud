import { useParams } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import { isMobile } from 'react-device-detect';
import { LinkOutlined } from '@ant-design/icons';
import { getFullS3Url } from '../../config-global';
import { pollActions } from '../../reducers/guestsSlice';
import { Button, Card, Flex, Layout, Typography } from 'antd';
import LoadingScreen from '../../components/LoadingScreen';

const { Content } = Layout;
const { Title } = Typography;

export default function UserAutomations() {
  const { userName } = useParams();

  const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
    user: null,
    loading: true,
    automations: [],
  });

  const { user, loading, automations } = state;

  // Fetch automations
  useEffect(() => {
    pollActions
      .getAutomationsByUserName(userName)
      .then(({ user, automations }) => setState({ user, automations }))
      .catch((error) => console.error(error?.response?.data?.error || 'Error fetching automations'))
      .finally(() => setState({ loading: false }));
  }, [userName]);

  if (loading) return <LoadingScreen />;

  return (
    <Layout className="h-100">
      <Content className="p-4 bg-white">
        <Title level={2} className="mt-0">
          Automations for {user?.firstName} {user?.lastName}
        </Title>

        <Flex gap={28} wrap="wrap">
          {automations.map(({ _id, uniqueId, socialShareFileSrc, presentationName }, i) => (
            <Card
              key={_id}
              hoverable
              title={presentationName || `Automation ${i + 1}`}
              styles={{ body: { padding: 0 } }}
              style={{ width: isMobile ? '100%' : 'calc(33% - 15.5px)' }}
              actions={[
                <Button
                  key="vote"
                  type="link"
                  target="_blank"
                  icon={<LinkOutlined />}
                  href={`/vote/${user?.userName}/${uniqueId}`}
                >
                  Voting Page
                </Button>,
                <Button
                  key="ga"
                  type="link"
                  target="_blank"
                  icon={<LinkOutlined />}
                  href={`/guest-acceptance/${user?.userName}/${uniqueId}`}
                >
                  Guest Acceptance
                </Button>,
              ]}
            >
              <div className="m-5px br-4px h-180px bg-EEF2F6">
                <video
                  controls
                  src={getFullS3Url(socialShareFileSrc)}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </Card>
          ))}
        </Flex>
      </Content>
    </Layout>
  );
}
