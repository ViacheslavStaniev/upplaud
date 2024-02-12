import { Typography } from 'antd';
import PropTypes from 'prop-types';

CopyText.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default function CopyText({ text = '', className = '', onCopy = () => {} }) {
  return (
    <div className={`p-1 br-5px bg-sky-6 border-sky-1 ${className}`}>
      <Typography.Paragraph ellipsis copyable={{ onCopy }} className="m-0 flex-item space-between">
        {text}
      </Typography.Paragraph>
    </div>
  );
}
