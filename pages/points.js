import { Statistic, Button, Space } from 'antd';
import { useSession } from "next-auth/react";

export default function Points() {
  const {data: session} = useSession()
  if (session) {
    return (
      <>
        <Space>
          <h3>Points</h3>
          <Button>Buy Points</Button>
        </Space>
        <Statistic title="Your points" value={1000000} precision={0}/>
      </>
    );
  }
  return (<>Hello guest, please sign-in to continue.</>)
}
