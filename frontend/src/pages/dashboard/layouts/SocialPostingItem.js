import Accordian from '../../../components/Accordian';
import { isMobile } from 'react-device-detect';
import { getSocialLabel } from '../../../utils/common';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Select, Form, Alert, Tooltip } from 'antd';

export default function SocialPostingItem() {
  const form = Form.useFormInstance();
  const socialItems = Form.useWatch('socials', form) || [];

  const postingOptions = [4, 3, 2, 1].map((value) => ({
    value,
    label: `Post [${value}x] monthly`,
  }));

  // Update Socials
  const onChangeSet = (_id, field, value) => {
    const items = socialItems.map((item) =>
      item._id === _id ? { ...item, [field]: value } : item
    );

    form.setFieldValue('socials', items);
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
  ];

  return <Accordian items={items} defaultActive="social" marginBottom={false} />;
}
