import { Statistic, Button, Space } from 'antd';

export default function Points() {
  return (
    <>
      <Space>
        <h3>Points</h3>
        <Button>Buy Points</Button>
      </Space>
      <Statistic title="Your points" value={1000000} precision={0} />
    </>
  );
}
