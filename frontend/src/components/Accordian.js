import { Collapse } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export default function Accordian({ items = [], defaultActive = '' }) {
  return (
    <Collapse
      items={items}
      bordered={false}
      className="mb-2 bg-F7F3F9"
      defaultActiveKey={defaultActive ? [defaultActive] : []}
      expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
    />
  );
}
