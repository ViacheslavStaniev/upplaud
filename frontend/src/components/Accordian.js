import { Collapse } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export default function Accordian({ items = [], defaultActive = '', marginBottom = true }) {
  return (
    <Collapse
      items={items}
      bordered={false}
      className={`bg-F7F3F9 ${marginBottom ? 'mb-2' : ''}`}
      defaultActiveKey={defaultActive ? [defaultActive] : []}
      expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
    />
  );
}
