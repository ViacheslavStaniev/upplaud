import React from 'react';
import { Collapse, Select, Button, ColorPicker, Space, Table } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

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
        text
      ),
  },
  {
    title: 'Button',
    dataIndex: 'buttonLabel',
    key: 'buttonLabel',
    render: (text, record) =>
      record.buttonLabel ? (
        <Button type="link" icon={record.buttonIcon} size="medium">
          {text}
        </Button>
      ) : null,
  },
  {
    title: 'Action / Color Label',
    dataIndex: 'previewLabel',
    key: 'previewLabel',
    render: (text, record) => {
      if (text) {
        return (
          <Button type="link" size="medium" className='pl-0'>
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
    render: (text, record) => (record.textColorLabel ? text : null),
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

export default function PollSharingImage() {
  return (
    <Collapse
      bordered={false}
      className="mb-2 bg-F7F3F9"
      expandIconPosition="left"
      expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
    >
      <Panel header="Customize poll sharing image">
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
            GENERAL POLL SHARING IMAGE
          </Button>
          <Button type="primary">UPLOAD YOUR OWN</Button>
        </Space>
      </Panel>
    </Collapse>
  );
}
