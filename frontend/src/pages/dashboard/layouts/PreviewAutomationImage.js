import { Image } from 'antd';
import { useState } from 'react';
import { getFullS3Url } from '../../../config-global';

export default function PreviewAutomationImage({
  prevEl = null,
  className = '',
  pollImageSrc = '',
}) {
  const [showPollImagePreview, setShowPollImagePreview] = useState(false);

  return (
    <>
      <span className={className} onClick={() => setShowPollImagePreview(true)}>
        {prevEl || 'Preview'}
      </span>

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
