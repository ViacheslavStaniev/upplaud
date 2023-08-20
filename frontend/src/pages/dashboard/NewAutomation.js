import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GUEST_TYPE } from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { addGuest, fetchGuest, updateGuest, updateState } from '../../reducers/guestsSlice';
import {
  Form,
  Space,
  Input,
  Button,
  DatePicker,
  Typography,
  Radio,
  Collapse,
  Select,
  Divider,
  Switch,
  ColorPicker,
} from 'antd';
import AppTitle from '../../components/AppTitle';
import SocialPostingItem from './SocialPostingItem';

const { Panel } = Collapse;
const { Option } = Select;
const { Text, Title } = Typography;

const { HOST_GUEST, SOLO_SESSION, GUEST_SPEAKER } = GUEST_TYPE;

const tableConfig = [
  {
    label: 'LOGO IMAGE FROM:',
    selectOptions: [{ value: 'default', label: 'Default name' }],
    buttonLabel: 'ADD NEW IMAGE',
    buttonIcon: <PlusOutlined />,
    previewLabel: 'PREVIEW SELECTION',
  },
  {
    label: 'HEADLINE HOOK:',
    selectOptions: [{ value: 'list', label: 'List' }],
    buttonLabel: 'ADD NEW HOOK',
    buttonIcon: <PlusOutlined />,
    colorLabel: 'HEADLINE BG COLOR',
    textColorLabel: 'HEADLINE TEXT COLOR',
  },
  {
    label: 'FOOTER HOOK:',
    selectOptions: [{ value: 'list', label: 'List' }],
    buttonLabel: 'ADD NEW ACTION',
    buttonIcon: <PlusOutlined />,
    colorLabel: 'FOOTER BG COLOR',
    textColorLabel: 'FOOTER TEXT COLOR',
  },
];

export default function NewAutomation({ isGuestAcceptance = false }) {
  const [form] = Form.useForm();

  const { id } = useParams();
  const dispatch = useDispatch();

  const [isAcc1Open, setIsAcc1Open] = useState(false);
  const [isAcc2Open, setIsAcc2Open] = useState(false);

  const isNew = id === 'new'; // new automation
  const withGuestValue = Form.useWatch('withGuest', form);

  const { guest, isLoading } = useSelector((state) => state.guests);
  const {
    recordingDate = null,
    guest: guestUser,
    freebieUrl = '',
    withGuest = true,
    potentialTopics = ['', ''],
    startHostAutomation = false,
  } = guest || {};
  console.log(guest, id, isNew, withGuestValue);

  useEffect(() => {
    if (!isNew && id) dispatch(fetchGuest(id));

    return () => {
      updateState({ guest: null });
    };
  }, [isNew, id, dispatch]);

  useEffect(() => {
    guest && form.resetFields();
  }, [guest, form]);

  const initialValues = {
    withGuest,
    freebieUrl,
    potentialTopics,
    startHostAutomation,
    guestType: HOST_GUEST,
    email: guestUser?.email,
    lastName: guestUser?.lastName,
    firstName: guestUser?.firstName,
    cellPhone: guestUser ? guestUser.profile?.phone : '',
    linkedinUrl: guestUser ? guestUser.socialAccounts?.linkedin.profileLink : '',
    recordingDate: recordingDate ? dayjs(recordingDate, 'YYYY/MM/DD') : null,
  };

  const toggleAccordion = (accordionIndex, setIsOpen) => () => {
    if (accordionIndex === 1) setIsAcc1Open(!isAcc1Open);
    if (accordionIndex === 2) setIsAcc2Open(!isAcc2Open);
  };

  const guestTypeOptions = [
    { key: HOST_GUEST, value: HOST_GUEST, label: 'HOST A GUEST' },
    { key: SOLO_SESSION, value: SOLO_SESSION, label: 'SOLO SESSION' },
    { key: GUEST_SPEAKER, value: GUEST_SPEAKER, label: "I'M A GUEST SPEAKER" },
  ];

  return (
    <>
      {!isGuestAcceptance && <AppTitle title={`${isNew ? 'New' : 'Update'} Automation`} />}

      <div className="add-guest">
        <Title className="m-0">AUTOMATE POLL SHARING</Title>
        <Title level={5} className="fw-400" type="secondary">
          Pull in more interest when your upplaud poll is posted automatically.
        </Title>
      </div>

      <Form
        form={form}
        size="large"
        colon={false}
        labelAlign="left"
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 15 }}
        initialValues={initialValues}
        onFinish={(data) => {
          if (isNew) {
            dispatch(addGuest(data));
          } else {
            dispatch(updateGuest(id, data));
          }
        }}
      >
        <Form.Item name="guestType">
          <Radio.Group options={guestTypeOptions} />
        </Form.Item>

        <Form.Item
          name="recordingDate"
          label={
            <div className="label">
              Poll End Date: <CalendarOutlined />
            </div>
          }
        >
          <DatePicker className="hidden-date-picker" />
        </Form.Item>

        <div className="flex-item gap-2">
          <div className="flex-1">
            <Title level={5}>Guest Info</Title>
            {[
              'full Name',
              'cell Phone',
              'email Address',
              'bio Or Social Url',
              'headshot Url or: Upload',
            ].map((fieldName) => (
              <Form.Item
                key={fieldName}
                name={fieldName}
                label={<div className="label">{fieldName.toUpperCase()}:</div>}
              >
                <Input placeholder={fieldName.toUpperCase()} />
              </Form.Item>
            ))}
          </div>
          <div className="flex-1">
            <Title level={5}>Poll Info</Title>
            <Form.Item>
              (Use AI to generate topics; see <u>video tutorial</u>)
            </Form.Item>
            {['topic Or Story1', 'topic Or Story2', 'host Offer Url', 'guest Offer Url'].map(
              (fieldName) => (
                <Form.Item
                  key={fieldName}
                  name={fieldName}
                  label={<div className="label">{fieldName.toUpperCase()}:</div>}
                >
                  <Input placeholder={fieldName.toUpperCase()} />
                </Form.Item>
              )
            )}
          </div>
        </div>

        <Collapse
          bordered={false}
          expandIconPosition="right"
          defaultActiveKey={['1']}
          className="collapse-container"
          onChange={toggleAccordion(1, setIsAcc1Open)}
        >
          <Panel
            header={
              <h3>
                {isAcc1Open ? <PlusOutlined /> : <MinusOutlined />} Customize poll sharing image
              </h3>
            }
            key="1"
            showArrow={false}
          >
            <table className="config-table">
              <tbody>
                {tableConfig.map((config, index) => (
                  <tr key={index}>
                    <td>{config.label}</td>
                    <td>
                      <Select className="minw-150px">
                        {config.selectOptions.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>
                      <Button type="link" icon={config.buttonIcon} className="ml-1">
                        {config.buttonLabel}
                      </Button>
                    </td>
                    <td>
                      <Divider type="vertical" />
                    </td>
                    {config.previewLabel && (
                      <td>
                        <Button type="link" className="pl-4">
                          {config.previewLabel}
                        </Button>
                      </td>
                    )}
                    {config.colorLabel && (
                      <>
                        <td>
                          <span className="pl-2 ml-1">{config.colorLabel}:</span>
                        </td>
                        <td>
                          <ColorPicker showText />
                        </td>
                      </>
                    )}
                    {config.textColorLabel && (
                      <>
                        <td>
                          <span className="pl-4 ml-1">{config.textColorLabel}:</span>
                        </td>
                        <td>
                          <ColorPicker showText className="ml-1" />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <Space size={30} className="mt-4">
              <Button type="primary" danger>
                GENERAL POLL SHARING IMAGE
              </Button>
              <Button type="primary">UPLOAD YOUR OWN</Button>
            </Space>
          </Panel>
        </Collapse>

        <SocialPostingItem />

        <div className="flex-item gap-1">
          <Text strong>POSTING STARTS NOW</Text>
          <Switch />
          <Text type="secondary">Start when guest starts</Text>
        </div>

        <Space size={30} className="mt-4">
          <Button>SAVE DRAFT</Button>
          <Button type="primary">LAUNCH POLL AUTOMATION</Button>
        </Space>
      </Form>
    </>
  );
}
