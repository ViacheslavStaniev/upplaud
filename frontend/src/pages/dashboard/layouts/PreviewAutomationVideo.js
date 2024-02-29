import { useState } from 'react';
import { Modal, Typography } from 'antd';
import { getFullS3Url } from '../../../config-global';

export default function PreviewAutomationVideo({
  text = '',
  className = '',
  socialShareFileSrc = '',
}) {
  const [openVideoPreview, setOpenVideoPreview] = useState(false);

  return (
    <>
      <Typography.Link className={className} onClick={() => setOpenVideoPreview(true)}>
        {text || 'Preview Video'}
      </Typography.Link>

      <Modal
        centered
        width={'50%'}
        footer={false}
        open={openVideoPreview}
        title="Preview Video Invitation Post"
        onCancel={() => setOpenVideoPreview(false)}
      >
        <video
          controls
          src={getFullS3Url(socialShareFileSrc)}
          style={{ width: '100%', height: 'auto' }}
        />
      </Modal>
    </>
  );
}
