import { Watermark } from 'antd';
import watermarkImage from '../assets/images/watermark.svg';

export default function WatermarkPlacehlder({ children }) {
  return (
    <Watermark height={200} width={100} image={watermarkImage} zIndex={0} className="watermark">
      {children}
    </Watermark>
  );
}
