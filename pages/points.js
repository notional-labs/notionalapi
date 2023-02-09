import { Statistic, Button, Space } from 'antd';
import { useSession } from "next-auth/react";

export default function Points() {
  const {data: session, status} = useSession();

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied.</p>
  }

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
