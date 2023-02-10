import { Statistic, Button, Space } from 'antd';
import { useSession } from "next-auth/react";

export default function CreateApiKey() {
  const {data: session, status} = useSession();

  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Access Denied.</p>

  return (
    <>
      <Space>
        <h3>Create Api-Key</h3>
      </Space>
    </>
  );
}
