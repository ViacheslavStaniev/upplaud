import Logo from '../../components/Logo';
import AppTitle from '../../components/AppTitle';
import CustomIcon from '../../components/CustomIcon';
import WatermarkPlacehlder from '../../components/WatermarkPlacehlder';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { POLL_STATUS } from '../../utils/types';
import { getFullS3Url } from '../../config-global';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, Navigate } from 'react-router-dom';
import { saveVote, pollActions } from '../../reducers/guestsSlice';
import { Card, Spin, Flex, Form, Image, Modal, Input, Button, Avatar, Typography } from 'antd';

const { Text, Link, Title, Paragraph } = Typography;

// eslint-disable-next-line
const questionnaireQuestions = [
  {
    key: 'first',
    answers: '',
    question: 'So, what’s your interest in this topic?',
    options: ['For me', 'For someone else', 'No, just voted to help'],
  },
  {
    key: 'second',
    answers: {},
    question: 'Oh? Know someone else that should hear our topic?',
    options: [''],
  },
  {
    key: 'third',
    answers: '',
    question: 'BTW: If we put together a guide or a checklist based on the topic:',
    options: ['Yes', 'Maybe', 'No'],
  },
  {
    key: 'fourth',
    answers: '',
    question: 'Would you be willing to post our topic poll on your Facebook or LinkedIn?',
    options: [],
  },
];

// Final Result Object
const finalResultObj = {
  poll: '',
  isSuggestion: false,
  questionnaireAnswers: [],
  selectedTopic: { topic: '', index: 0 },
  suggestions: { topic: '', speaker: '' },
  voter: { name: '', email: '', cell_phone: '' },
};

export default function VotingPage() {
  const { userName, pollUniqueId } = useParams();

  const [state, setState] = useState({
    currentQuestion: 1,
    showEndScreen: false,
    openSuccessModal: false,
    startQuestionnaire: false,
    openSuggestionForm: false,
    finalResult: finalResultObj,
    poll: { guest: null, error: null, isLoading: false },
  });
  const [thirdStepAnswers, setThirdStepAnswers] = useState({
    answer: '',
    userInfo: { name: '', email: '', cell_phone: '' },
  });

  const updateState = (newState) => setState((preState) => ({ ...preState, ...newState }));
  const {
    poll,
    finalResult,
    showEndScreen,
    currentQuestion,
    openSuccessModal,
    openSuggestionForm,
    startQuestionnaire,
  } = state;

  const questionnaireAnswers = finalResult?.questionnaireAnswers || [];
  const preAnswers = questionnaireAnswers[currentQuestion - 1];

  const { guest, error, isLoading } = poll;
  const guestId = guest?._id;

  useEffect(() => {
    const updateLState = (ns) => setState((s) => ({ ...s, poll: { ...s.poll, ...ns } }));

    // Start Loading
    updateLState({ isLoading: true });

    pollActions
      .getPollByUniqueId(userName, pollUniqueId)
      .then((guest) => updateLState({ guest, isLoading: false }))
      .catch((error) => updateLState({ error, isLoading: false }));
  }, [userName, pollUniqueId]);

  if (error || (guest && guest?.status === POLL_STATUS.DRAFT)) return <Navigate to="/404" />;

  const pollImageSrc = getFullS3Url(guest?.pollImageSrc) || '';
  const [topic1 = '', topic2 = ''] = guest?.potentialTopics || [];

  const saveVoteHandler = (values) => {
    // Save Topic
    saveVote(guestId, values)
      .then((result) => updateState({ finalResult: !result?._id ? values : result }))
      .catch(console.log);
  };

  // On topic Select
  const onTopicSelect = (index = 0, topic = '') => {
    const newState = {
      openSuccessModal: topic !== '',
      openSuggestionForm: topic === '',
      finalResult: {
        ...finalResult,
        poll: guestId,
        isSuggestion: topic === '',
        selectedTopic: { topic, index },
      },
    };
    updateState(newState);
    saveVoteHandler(newState.finalResult);
  };

  // On Questionnaire Answer
  const onQuestionnaireAnswer = (questionIndex = 0, answers = '') => {
    const showEndScreen = questionIndex === 3;
    const { questionnaireAnswers = [] } = finalResult;

    // Answers
    if (questionnaireAnswers[questionIndex]) {
      questionnaireAnswers[questionIndex] = { ...questionnaireAnswers[questionIndex], answers };
    } else {
      questionnaireAnswers.push({ ...questionnaireQuestions[questionIndex], answers });
    }

    const newState = {
      showEndScreen,
      finalResult: { ...finalResult, questionnaireAnswers },
      currentQuestion: showEndScreen ? currentQuestion : currentQuestion + 1,
    };

    updateState(newState);
    saveVoteHandler(newState.finalResult);
  };

  // End Screen
  if (showEndScreen) {
    return (
      <div className="text-center">
        <PollImage src={pollImageSrc} height={160} />
        <Card className="bg-EEF4FB mt-4 mb-4" bodyStyle={{ padding: 14 }}>
          <Title level={3} className="m-">
            Thank you for your help!
          </Title>

          <div className="reward-links">
            <Title level={5} className="mt-2">
              SEE YOUR REWARDS FROM:
            </Title>
            <Button
              type="info"
              size="large"
              shape="round"
              target="_blank"
              className="fw-400"
              href={guest?.guestOfferUrl}
            >
              {`${guest?.guest?.firstName} ${guest?.guest?.lastName}`}
            </Button>
            <Title level={5} className="mt-2">
              SEE YOUR REWARDS FROM:
            </Title>
            <Button
              size="large"
              shape="round"
              type="primary"
              target="_blank"
              className="fw-400"
              href={guest?.hostOfferUrl}
            >
              {`${guest?.user?.firstName} ${guest?.user?.lastName}`}
            </Button>
          </div>
        </Card>

        <Paragraph type="secondary" className="mb-4">
          To get more from what we present, click to vote in our other Upplaud polls.
        </Paragraph>

        <Logo />
      </div>
    );
  }

  // Questionnaire
  if (startQuestionnaire) {
    return (
      <div className="questionnaire p-2">
        <div className="flex-item gap-2 mb-2">
          <Text className="color-0AB6B6">01</Text>
          <div className="flex-1 flex-item gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                onClick={() => updateState({ currentQuestion: index + 1 })}
                style={{
                  flex: 1,
                  height: 8,
                  cursor: 'pointer',
                  backgroundColor: currentQuestion - 1 >= index ? '#0AB6B6' : '#eeeeee',
                  pointerEvents: questionnaireAnswers[index] ? 'auto' : 'none',
                }}
              />
            ))}
          </div>
          <Text className="color-0AB6B6">04</Text>
        </div>

        {currentQuestion === 1 && (
          <div className="first-question">
            <Paragraph type="secondary" className="m-0">
              "{finalResult?.selectedTopic?.topic}"
            </Paragraph>
            <Title level={3} className="m-0" type="info">
              So, what’s your interest in this topic?
            </Title>

            <Flex vertical gap={20} className="mt-4">
              {['For me', 'For someone else', 'No, just voted to help'].map((option, index) => (
                <Button
                  key={index}
                  shape="round"
                  size="large"
                  className="text-left"
                  icon={<CustomIcon name="circle" />}
                  onClick={() => onQuestionnaireAnswer(0, option)}
                  type={preAnswers && preAnswers?.answers === option ? 'info' : 'default'}
                >
                  {option}
                </Button>
              ))}
            </Flex>
          </div>
        )}

        {currentQuestion === 2 && (
          <div className="second-question">
            <Paragraph type="secondary" className="m-0">
              "{finalResult?.selectedTopic?.topic}"
            </Paragraph>
            <Title level={3} className="m-0 mb-4" type="success">
              Oh? Know someone else that should hear our topic?
            </Title>

            <Form
              onFinish={(values) => onQuestionnaireAnswer(1, values)}
              initialValues={{
                name: preAnswers?.answers?.name || '',
                email: preAnswers?.answers?.email || '',
                comment: preAnswers?.answers?.comment || '',
                referral1: preAnswers?.answers?.referral1 || '',
                referral2: preAnswers?.answers?.referral2 || '',
              }}
            >
              <Form.Item label="Referral Name 1" name="referral1" rules={[{ required: true }]}>
                <Input placeholder="Referral Name 1" />
              </Form.Item>
              <Form.Item label="Referral Name 2" name="referral2">
                <Input placeholder="Referral Name 2" />
              </Form.Item>
              <Form.Item label="Your Comment" name="comment">
                <Input placeholder="Your Comment" />
              </Form.Item>
              <Form.Item label="Your Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Your Name" />
              </Form.Item>
              <Form.Item label="Your Email" name="email" rules={[{ required: true }]}>
                <Input placeholder="Your Email" />
              </Form.Item>

              <Button block={isMobile} shape="round" type="info" size="large" htmlType="submit">
                SEND ME EMAIL TO FORWARD
              </Button>
            </Form>

            <Button
              block={isMobile}
              type="ghost"
              className="mt-2"
              onClick={() => onQuestionnaireAnswer(1, { skipped: true })}
            >
              SKIP FOR NOW
            </Button>
          </div>
        )}

        {currentQuestion === 3 && (
          <div className="third-question">
            <Card className="bg-EEF4FB mb-4" bodyStyle={{ padding: 14 }}>
              <Title level={3} className="m-0 mb-2">
                BTW: If we put together a guide or a checklist based on the topic:
              </Title>

              <Paragraph type="secondary" className="m-0">
                "{finalResult?.selectedTopic?.topic}"
              </Paragraph>

              <Title level={4} className="m-0 mt-2" type="info">
                Would you want a copy?
              </Title>
              <Paragraph type="secondary" className="m-0">
                No cost, just thanks for voting.
              </Paragraph>

              <div className="flex-item gap-2 mt-2">
                {['Yes', 'Maybe', 'No'].map((option, index) => (
                  <Button
                    key={index}
                    size="large"
                    shape="round"
                    type={thirdStepAnswers?.answer === option ? 'info' : 'default'}
                    onClick={() => {
                      const answers = { ...thirdStepAnswers, answer: option };

                      setThirdStepAnswers(answers);

                      // Move forward
                      if (option === 'No') onQuestionnaireAnswer(2, answers);
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </Card>

            <Form
              initialValues={{
                name: preAnswers?.answers?.userInfo?.name || '',
                email: preAnswers?.answers?.userInfo?.email || '',
                cell_phone: preAnswers?.answers?.userInfo?.cell_phone || '',
              }}
              onFinish={({ userInfo }) =>
                onQuestionnaireAnswer(2, { ...thirdStepAnswers, userInfo })
              }
            >
              <Form.Item
                label="Your Name"
                name={['userInfo', 'name']}
                rules={[{ required: thirdStepAnswers?.answer !== 'No' }]}
              >
                <Input placeholder="Your Name" />
              </Form.Item>
              <Form.Item
                label="Your Email"
                name={['userInfo', 'email']}
                rules={[{ required: thirdStepAnswers?.answer !== 'No' }]}
              >
                <Input placeholder="Your Email" />
              </Form.Item>
              <Form.Item
                label="Your Cell Phone"
                name={['userInfo', 'cell_phone']}
                rules={[{ required: thirdStepAnswers?.answer !== 'No' }]}
              >
                <Input placeholder="Your Cell Phone" />
              </Form.Item>

              <Button
                block={isMobile}
                shape="round"
                type="info"
                size="large"
                htmlType="submit"
                disabled={thirdStepAnswers?.answer === ''}
              >
                SEND ME A FREE COPY
              </Button>
            </Form>
          </div>
        )}

        {currentQuestion === 4 && (
          <div className="fourth-question">
            <Card className="bg-EEF4FB mb-4" bodyStyle={{ padding: 14 }}>
              <Title level={3} className="m-0 mb-2">
                Last question, we promise!
              </Title>

              <Paragraph type="secondary" className="font-18px">
                Would you be willing to post our topic poll on your Facebook or LinkedIn? 
              </Paragraph>
              <Paragraph type="secondary" className="font-18px">
                You'll be helping us grow our audience. Thanks...
              </Paragraph>

              <Title level={4} className="m-0 mt-2" type="info">
                HELP US GET MORE VOTES:
              </Title>

              <Button
                type="link"
                target="_blank"
                block={isMobile}
                className="text-left font-18px"
                icon={<CustomIcon name="facebook" />}
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              >
                | Share poll on Facebook
              </Button>

              <Button
                type="link"
                target="_blank"
                block={isMobile}
                className="text-left font-18px"
                icon={<CustomIcon name="linkedin" />}
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
              >
                | Share poll on Linkedin
              </Button>
            </Card>

            <Button
              size="large"
              block={isMobile}
              shape="round"
              onClick={() => onQuestionnaireAnswer(3, { doneSharing: true, skipped: false })}
            >
              DONE SHARING? SEE YOUR REWARDS
            </Button>

            <Paragraph type="secondary" className="mt-4">
              If you'd rather not try to generate more interest for us, you can{' '}
              <Link onClick={() => onQuestionnaireAnswer(3, { doneSharing: false, skipped: true })}>
                click here
              </Link>{' '}
              to skip for now.
            </Paragraph>
          </div>
        )}

        {currentQuestion < 3 && (
          <div className="text-center mt-4">
            <PollImage src={pollImageSrc} height={160} className="mb-4" />

            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() =>
                updateState({
                  currentQuestion: 1,
                  openSuccessModal: false,
                  startQuestionnaire: false,
                  openSuggestionForm: false,
                })
              }
            >
              Change your vote
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Spin spinning={isLoading}>
      <WatermarkPlacehlder>
        <Card bordered={false} className="voting-page text-center">
          <AppTitle title="Vote" />

          {!openSuggestionForm && (
            <div className="voting-form">
              <PollImage src={pollImageSrc} />

              <Title level={2} type="info" className="mt-2">
                Which topic is more interesting?
              </Title>

              <Paragraph type="secondary">
                Tailor what we present: Click on a box to vote.
              </Paragraph>

              <Flex vertical={isMobile} gap={40} className="mb-4 text-left">
                <Card
                  hoverable
                  className="flex-1 bg-E6F5FB w-100"
                  onClick={() => onTopicSelect(0, topic1)}
                >
                  <Text strong className="font-16px">
                    {topic1}
                  </Text>
                  <CountAvatar count={1} />
                </Card>

                <Card
                  hoverable
                  className="flex-1 bg-F3EAF9 w-100"
                  onClick={() => onTopicSelect(1, topic2)}
                >
                  <Text strong className="font-16px">
                    {topic2}
                  </Text>
                  <CountAvatar count={2} />
                </Card>

                <Card hoverable className="flex-1 bg-EBF9E6 w-100">
                  <Paragraph className="m-0 pl-2 font-16px">Don’t prefer either?</Paragraph>

                  <Button type="link" size="large" onClick={() => onTopicSelect(2, '')}>
                    Submit your own topic.
                  </Button>
                  <CountAvatar count={3} />
                </Card>
              </Flex>

              <SuccessModal
                open={openSuccessModal}
                finalResult={finalResult}
                onClose={() => updateState({ openSuccessModal: false })}
                onBack={() => updateState({ openSuccessModal: false, openSuggestionForm: false })}
                onFinish={(values) => {
                  const newState = {
                    openSuccessModal: false,
                    startQuestionnaire: true,
                    finalResult: { ...finalResult, ...values },
                  };

                  updateState(newState);
                  saveVoteHandler(newState.finalResult);
                }}
              />
            </div>
          )}

          {openSuggestionForm && (
            <SuggestionForm
              finalResult={finalResult}
              pollImageSrc={pollImageSrc}
              onBack={() => updateState({ openSuggestionForm: false })}
              onFinish={(values) => {
                const newState = {
                  startQuestionnaire: true,
                  finalResult: { ...finalResult, ...values },
                };
                updateState(newState);
                saveVoteHandler(newState.finalResult);
              }}
            />
          )}
        </Card>
      </WatermarkPlacehlder>
    </Spin>
  );
}

function PollImage({ src, height = 200, ...params }) {
  return (
    <div className="text-center">
      <Image preview={false} src={src} height={height} {...params} />
    </div>
  );
}

// Count Avatar
function CountAvatar({ count = 0 }) {
  return (
    <Avatar
      size="large"
      className="bg-white filter-shadow-1 border-black-1"
      style={{ position: 'absolute', left: 'calc(50% - 23px)', bottom: -25 }}
    >
      <Text strong className="font-16px">
        {count}
      </Text>
    </Avatar>
  );
}

// Success Modal
function SuccessModal({ open, onClose, onBack, finalResult, onFinish }) {
  return (
    <Modal centered open={open} onCancel={onClose} footer={null} width={600}>
      <Title level={4} type="success" className="text-center mb-4">
        Thanks! We’ll let you know which topic wins...
      </Title>

      <Form layout="vertical" onFinish={onFinish} initialValues={finalResult}>
        <Form.Item label="Your Name" name={['voter', 'name']}>
          <Input placeholder="Your Name" />
        </Form.Item>
        <Form.Item label="Your Email" name={['voter', 'email']}>
          <Input placeholder="Your Email" />
        </Form.Item>
        <Form.Item label="Your Cell Phone" name={['voter', 'cell_phone']}>
          <Input placeholder="Your Cell Phone" />
        </Form.Item>

        <Flex vertical={isMobile} gap={20}>
          <Button
            block={isMobile}
            shape="round"
            type="info"
            size="large"
            htmlType="submit"
            className="flex-1"
          >
            UPDATE ME PLEASE
          </Button>

          <Button size="large" shape="round" block={isMobile} htmlType="submit" className="flex-1">
            NO, THANKS
          </Button>

          <Button
            type="text"
            size="large"
            shape="round"
            className="flex-1"
            onClick={onBack}
            icon={<ArrowLeftOutlined />}
          >
            Change your vote
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}

// Suggestion Form
function SuggestionForm({ onBack, finalResult, pollImageSrc, onFinish }) {
  return (
    <div className="suggestion-form text-left">
      <Title level={4} className="text-center">
        SUGGEST YOUR OWN TOPIC
      </Title>

      <Form layout="vertical" onFinish={onFinish} initialValues={finalResult}>
        <Form.Item label="Your Name" name={['voter', 'name']} rules={[{ required: true }]}>
          <Input placeholder="Your Name" />
        </Form.Item>
        <Form.Item label="Your Email" name={['voter', 'email']} rules={[{ required: true }]}>
          <Input placeholder="Your Email" />
        </Form.Item>
        <Form.Item
          label="Your Cell Phone"
          name={['voter', 'cell_phone']}
          rules={[{ required: true }]}
        >
          <Input placeholder="Your Cell Phone" />
        </Form.Item>
        <Form.Item
          label="Your Topic Suggestion"
          name={['suggestions', 'topic']}
          rules={[{ required: true }]}
        >
          <Input placeholder="Your Topic Suggestion" />
        </Form.Item>
        <Form.Item label="Your Speaker Suggestion" name={['suggestions', 'speaker']}>
          <Input placeholder="Your Speaker Suggestion" />
        </Form.Item>

        <Button block={isMobile} shape="round" type="info" size="large" htmlType="submit">
          SUBMIT TOPIC
        </Button>
      </Form>

      <div className="text-center mt-2">
        <PollImage src={pollImageSrc} height={160} className="mb-4" />

        <Button type="text" onClick={onBack} icon={<ArrowLeftOutlined />}>
          Change your vote
        </Button>
      </div>
    </div>
  );
}
