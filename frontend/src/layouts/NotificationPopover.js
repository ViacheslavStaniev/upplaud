import { BellOutlined } from "@ant-design/icons";
import { List, Badge, Avatar, Button, Popover } from "antd";

export default function NotificationPopover() {
  const notifications = Array(5)
    .fill(0)
    .map((_, i) => ({ title: `Notification ${i + 1}`, description: "Default sample text for this notification." }));

  return (
    <Popover
      overlayStyle={{ width: 380 }}
      content={
        <List
          itemLayout='horizontal'
          dataSource={notifications}
          renderItem={({ title, description }, index) => (
            <List.Item>
              <List.Item.Meta
                title={title}
                description={description}
                avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
              />
            </List.Item>
          )}
        />
      }
      arrow={false}
      trigger='click'
      title='Notifications'
      placement='bottomRight'
    >
      <Badge dot count={2}>
        <Button type='text' size='small' shape='circle' icon={<BellOutlined />} />
      </Badge>
    </Popover>
  );
}
