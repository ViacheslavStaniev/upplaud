import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function TopNavSearchbar() {
  return <Input size='large' placeholder='Search anything...' className='w-35 bg-EDEBEE' prefix={<SearchOutlined />} />;
}
