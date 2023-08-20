import React from 'react';
import { Collapse, Select, Button, ColorPicker, Space, Table, Input } from 'antd';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';

const { Option } = Select;

const tableConfig = [
  {
    label: 'LOGO IMAGE FROM:',
    selectOptions: [{ value: 'default', label: 'Default name' }],
    buttonLabel: 'ADD/MANAGE IMAGE',
    buttonIcon: <PlusOutlined />,
    previewLabel: 'PREVIEW SELECTION',
  },
  {
    label: 'HEADLINE HOOK:',
    element: <Input size="medium" />,
    buttonIcon: <QuestionOutlined />,
    colorLabel: 'HEADLINE BG COLOR',
    textColorLabel: 'HEADLINE TEXT COLOR',
  },
  {
    label: 'FOOTER BENEFIT:',
    element: <Input size="medium" />,
    buttonIcon: <QuestionOutlined />,
    colorLabel: 'FOOTER BG COLOR',
    textColorLabel: 'FOOTER TEXT COLOR',
  },
];

const columns = [
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: (text, record) =>
      record.selectOptions ? (
        <Select className="minw-200px" size="medium">
          {record.selectOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      ) : (
        record.element
      ),
  },
  {
    title: 'Button',
    dataIndex: 'buttonLabel',
    key: 'buttonLabel',
    align: "center",
    render: (text, record) =>
      record.buttonIcon ? (
        <Button type="link" icon={record.buttonIcon} size="medium">
          {text}
        </Button>
      ) : null,
  },
  {
    title: 'Action / Color Label',
    dataIndex: 'previewLabel',
    key: 'previewLabel',
    align: "right",
    render: (text, record) => {
      if (text) {
        return (
          <Button type="link" size="medium" className="pl-0 pr-0">
            {text}
          </Button>
        );
      } else if (record.colorLabel) {
        return record.colorLabel;
      }
      return null;
    },
  },
  {
    title: 'Color Picker',
    dataIndex: 'colorLabel',
    key: 'colorPicker',
    render: (_, record) => (record.colorLabel ? <ColorPicker showText size="medium" /> : null),
  },
  {
    title: 'Text Color Label',
    dataIndex: 'textColorLabel',
    key: 'textColorLabel',
    align: "right",
    render: (text, record) => (record.textColorLabel ? <span className='ml-1'>{text}</span> : null),
  },
  {
    title: 'Text Color Picker',
    dataIndex: 'textColorLabel',
    key: 'textColorPicker',
    render: (_, record) => (record.textColorLabel ? <ColorPicker showText size="medium" /> : null),
  },
];

const dataSource = tableConfig.map((config) => ({
  key: config.label,
  ...config,
}));

const items = [
  {
    key: 'social',
    label: 'Customize poll sharing image',
    children: (
      <div className="flex-item gap-1 flex-column align-baseline">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          showHeader={false}
          size="medium"
          rowClassName="bg-F7F3F9"
        />
        <Space size={30} className="mt-4">
          <Button type="primary" danger>
            GENERATE POLL SHARING IMAGE
          </Button>
          <Button type="primary">UPLOAD YOUR OWN</Button>
        </Space>
      </div>
    ),
  },
];

export default function PollSharingImage() {
  return (
    <Collapse
      items={items}
      bordered={false}
      className="mb-2 bg-F7F3F9"
      expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
    />
  );
}
