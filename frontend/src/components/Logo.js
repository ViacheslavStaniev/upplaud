import { Image } from "antd";
import logoSrc from "../logo_full.png";

export default function Logo() {
  return <Image src={logoSrc} preview={false} className='app-logo' />;
}
