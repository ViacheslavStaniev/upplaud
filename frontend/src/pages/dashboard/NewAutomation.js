import dayjs from 'dayjs';
import AppTitle from '../../components/AppTitle';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  Checkbox,
  Radio,
  Collapse,
  Select,
  Divider,
} from 'antd';

const { Title } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

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
    recordingDate: recordingDate ? dayjs(recordingDate, 'YYYY/MM/DD') : null,
    email: guestUser?.email,
    lastName: guestUser?.lastName,
    firstName: guestUser?.firstName,
    cellPhone: guestUser ? guestUser.profile?.phone : '',
    linkedinUrl: guestUser ? guestUser.socialAccounts?.linkedin.profileLink : '',
  };

  return (
    <>
      {!isGuestAcceptance && <AppTitle title={`${isNew ? 'New' : 'Update'} Automation`} />}
      <div className="add-guest">
        <Title>AUTOMATE POLL SHARING</Title>
        <Title level={5} className="m-0 mb-4 fw-400 color-45485C">
          Pull in more interest when your upplaud poll is posted automatically.
        </Title>
      </div>
      <Form
        form={form}
        size="large"
        layout="horizontal"
        labelCol={{ span: 6 }}
        labelAlign="left"
        labelWrap
        colon={false}
        wrapperCol={{ span: 10 }}
        initialValues={initialValues}
        onFinish={(data) => {
          if (isNew) {
            dispatch(addGuest(data));
          } else {
            dispatch(updateGuest(id, data));
          }
        }}
      >
        <Form.Item name="sessionType">
          <Radio.Group>
            <Radio value="HOST_A_GUEST">HOST A GUEST</Radio>
            <Radio value="SOLO_SESSION">SOLO SESSION</Radio>
            <Radio value="GUEST_SPEAKER">I'M A GUEST SPEAKER</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="recordingDate"
          label={
            <div style={{ paddingTop: '10px' }}>
              Poll End Date: <CalendarOutlined />
            </div>
          }
          // rules={[{ required: true, message: 'Please fill the Recording Date.' }]}
        >
          <DatePicker style={{ visibility: 'hidden' }} />
        </Form.Item>

        <div className="flex-item gap-2">
          <div className="flex-1">
            <h3>Guest Info</h3>
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
                label={<div style={{ paddingTop: '10px' }}>{fieldName.toUpperCase()}:</div>}
              >
                <Input placeholder={fieldName.toUpperCase()} />
              </Form.Item>
            ))}
          </div>
          <div className="flex-1">
            <h3>Poll Info</h3>
            <Form.Item>
              (Use AI to generate topics; see <u>video tutorial</u>)
            </Form.Item>
            {['topic Or Story1', 'topic Or Story2', 'host Offer Url', 'guest Offer Url'].map(
              (fieldName) => (
                <Form.Item
                  key={fieldName}
                  name={fieldName}
                  label={<div style={{ paddingTop: '10px' }}>{fieldName.toUpperCase()}:</div>}
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
          style={{ marginBottom: '25px' }}
          onChange={() => setIsAcc1Open(!isAcc1Open)}
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
            <table style={{ width: '100%' }}>
              <tbody>
                {tableConfig.map((config, index) => (
                  <tr key={index}>
                    <td style={{ paddingBottom: '10px' }}>{config.label}</td>
                    <td style={{ paddingBottom: '10px' }}>
                      <Select style={{ width: '100%', minWidth: '150px' }}>
                        {config.selectOptions.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td style={{ paddingBottom: '10px' }}>
                      <Button
                        type="link"
                        icon={config.buttonIcon}
                        style={{ width: '100%', textAlign: 'left' }}
                      >
                        {config.buttonLabel}
                      </Button>
                    </td>
                    <td style={{ paddingBottom: '10px' }}>
                      <Divider type="vertical" />
                    </td>
                    {config.previewLabel && (
                      <td style={{ paddingBottom: '10px' }}>
                        <Button type="link" style={{ width: '100%', textAlign: 'left' }}>
                          {config.previewLabel}
                        </Button>
                      </td>
                    )}
                    {config.colorLabel && (
                      <>
                        <td style={{ paddingBottom: '10px' }}>
                          <span style={{ marginLeft: '15px' }}>{config.colorLabel}:</span>
                        </td>
                        <td style={{ paddingBottom: '10px' }}>
                          <Radio value={config.colorLabel}></Radio>
                        </td>
                        <td style={{ paddingBottom: '10px' }}>
                          <Input placeholder="#123456" style={{ width: '100%' }} />
                        </td>
                      </>
                    )}
                    {config.textColorLabel && (
                      <>
                        <td style={{ paddingBottom: '10px' }}>
                          <span style={{ marginLeft: '15px' }}>{config.textColorLabel}:</span>
                        </td>
                        <td style={{ paddingBottom: '10px' }}>
                          <Radio value={config.textColorLabel}></Radio>
                        </td>
                        <td style={{ paddingBottom: '10px' }}>
                          <Input placeholder="#123456" style={{ width: '100%' }} />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <Space size={30} style={{ margin: '30px 0 10px 0' }}>
              <Button type="primary" danger>
                GENERAL POLL SHARING IMAGE
              </Button>
              <Button type="primary">UPLOAD YOUR OWN</Button>
            </Space>
          </Panel>
        </Collapse>

        <Collapse
          bordered={false}
          expandIconPosition="right"
          defaultActiveKey={['2']}
          style={{ marginBottom: '25px' }}
          onChange={() => setIsAcc2Open(!isAcc2Open)}
        >
          <Panel
            header={
              <h3>
                {isAcc2Open ? <PlusOutlined /> : <MinusOutlined />} Confirm socials & posting
                frequency
              </h3>
            }
            key="2"
            showArrow={false}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox style={{ marginRight: '10px' }}>YOUR FACEBOOK PROFILE</Checkbox>
              <span>Post [4x] monthly | INTRO TEXT:</span>
              <Input
                placeholder="Enter intro text"
                style={{ marginLeft: '10px', maxWidth: '250px' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Checkbox style={{ marginRight: '10px' }}>
                YOUR FACEBOOK GROUP: This is the group name
              </Checkbox>
              <span>Post [4x] monthly | INTRO TEXT:</span>
              <Input
                placeholder="Enter intro text"
                style={{ marginLeft: '10px', maxWidth: '250px' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Checkbox style={{ marginRight: '10px' }}>YOUR LINKEDIN PROFILE</Checkbox>
              <span>Post [4x] monthly | INTRO TEXT:</span>
              <Input
                placeholder="Enter intro text"
                style={{ marginLeft: '10px', maxWidth: '250px' }}
              />
            </div>
            <div style={{ marginTop: '10px' }}>Connect more social media in Account Admin.</div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Radio.Group>
                <Radio value="now">POSTING STARTS NOW</Radio>
                <Radio value="guest">Start when guest starts</Radio>
              </Radio.Group>
            </div>
            <Space size={30} style={{ margin: '30px 0 10px 0' }}>
              <Button type="primary">SAVE DRAFT</Button>
              <Button type="primary">LAUNCH POLL AUTOMATION</Button>
            </Space>
          </Panel>
        </Collapse>

        <Button
          shape="round"
          htmlType="submit"
          loading={isLoading}
          className="minw-110px primary-outlined"
        >
          {isNew ? 'ADD TO' : 'UPDATE'} AUTOMATE
        </Button>
      </Form>
    </>
  );
}
