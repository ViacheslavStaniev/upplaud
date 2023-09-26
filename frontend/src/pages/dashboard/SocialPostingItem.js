import { Checkbox, Select, Form } from 'antd';
import { getSocialLabel } from '../../utils/common';
import Accordian from '../../components/Accordian';

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

  const items = [
    {
      key: 'social',
      label: 'Confirm Socials & Posting Frequency',
      children: (
        <div className="flex-item gap-1 flex-column align-baseline">
          <Form.Item name="socials" hidden>
            <input />
          </Form.Item>

          {socialItems.map(({ _id, type, subType, subTypeName = '', isActive, frequency }) => (
            <div className="flex-item gap-1 flex-auto" key={_id}>
              <Checkbox
                checked={isActive}
                className="uppercase"
                onChange={(e) => onChangeSet(_id, 'isActive', e.target.checked)}
              >
                {getSocialLabel(type, subType, subTypeName)}
              </Checkbox>
              <Select
                size="small"
                defaultValue={4}
                value={frequency}
                placeholder="Select"
                options={postingOptions}
                style={{ minWidth: 200 }}
                onChange={(value) => onChangeSet(_id, 'frequency', value)}
              />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return <Accordian items={items} defaultActive="social" />;
}
