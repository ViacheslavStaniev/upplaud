import { Checkbox, Collapse, Select } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export default function SocialPostingItem() {
  const postTimes = [4, 3, 2, 1];
  const groupName = 'My Group Name';

  const socials = [
    {
      key: 'facebook',
      label: 'YOUR FACEBOOK PROFILE',
      postingOptions: postTimes.map((time) => ({ value: time, label: `Post [${time}x] monthly` })),
    },
    {
      key: 'facebookGroup',
      label: `YOUR FACEBOOK GROUP: ${groupName}`,
      postingOptions: postTimes.map((time) => ({ value: time, label: `Post [${time}x] monthly` })),
    },
    {
      key: 'linkedin',
      label: 'YOUR LINKEDIN PROFILE',
      postingOptions: postTimes.map((time) => ({ value: time, label: `Post [${time}x] monthly` })),
    },
  ];

  const items = [
    {
      key: 'social',
      label: 'Confirm socials & posting frequency',
      children: (
        <div className="flex-item gap-1 flex-column align-baseline">
          {socials.map(({ label, postingOptions }) => (
            <div className="flex-item gap-1 flex-auto">
              <Checkbox className="checkbox">{label}</Checkbox>
              <Select
                size="small"
                defaultValue={4}
                placeholder="Select"
                options={postingOptions}
                style={{ minWidth: 200 }}
              />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Collapse
      items={items}
      bordered={false}
      className="mb-2 bg-F7F3F9"
      expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
    />
  );
}
