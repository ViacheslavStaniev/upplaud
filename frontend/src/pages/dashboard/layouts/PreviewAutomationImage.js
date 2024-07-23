import { useState } from 'react';
import { Image, Typography } from 'antd';
import { getFullS3Url } from '../../../config-global';

export default function PreviewAutomationImage({
  prevEl = null,
  className = '',
  pollImageSrc = '',
  showUploadAlert = false,
}) {
  const [showPollImagePreview, setShowPollImagePreview] = useState(false);

  return (
    <>
      <span className={className} onClick={() => setShowPollImagePreview(true)}>
        {prevEl || 'Preview'}
      </span>

      {showUploadAlert && !pollImageSrc && (
        <Typography.Text type="danger" className="ml-1">
          Please generate the image first.
        </Typography.Text>
      )}

      <Image
        style={{ display: 'none' }}
        src={getFullS3Url(pollImageSrc)}
        preview={{
          visible: showPollImagePreview,
          onVisibleChange: (value) => setShowPollImagePreview(value),
        }}
      />
    </>
  );
}
