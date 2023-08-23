import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';
import { Modal, List, Typography } from 'antd';

SuggestionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default function SuggestionModal({ open, onCancel }) {
  const suggestions = [
    'BENEFIT TO VOTER:',
    'Learn 3 mistakes to avoid...',
    'Hear the juicy details',
    'Ask Anything & Hear The Answer',
    'Make our podcast perfect for you...',
    'Have us discuss what you want to know',
    'Hear some step by step instructions',
    'Get free help from our guest speaker',
  ];

  return (
    <Modal centered open={open} footer={false} title="Suggestions" onCancel={onCancel}>
      <SimpleBar style={{ maxHeight: 'calc(100vh - 200px)', paddingRight: 10 }}>
        <List
          header={false}
          footer={false}
          bordered={false}
          dataSource={suggestions}
          renderItem={(item, index) => (
            <List.Item>
              {index + 1}. <Typography.Text copyable>{item}</Typography.Text>
            </List.Item>
          )}
        />
      </SimpleBar>
    </Modal>
  );
}
