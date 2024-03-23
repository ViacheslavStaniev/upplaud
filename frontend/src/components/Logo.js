import { Image } from 'antd';
import logoSrc from '../logo_full.png';

export default function Logo({ className = '', rootClassName = '' }) {
  return (
    <Image
      src={logoSrc}
      preview={false}
      rootClassName={rootClassName}
      className={`app-logo ${className}`}
    />
  );
}
