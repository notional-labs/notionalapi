import { Statistic, Button, Space } from 'antd';
import { useSession } from "next-auth/react";
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Points() {
  const {data: session, status} = useSession();
  const { data, error, isLoading } = useSWR('/api/my_point', fetcher)

  if (status === "loading" || isLoading) return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Access Denied.</p>
  if (error) return <p>failed to load</p>

  return (
    <>
      <Space>
        <h3>Points</h3>
        <Button>Buy Points</Button>
      </Space>
      <Statistic title="Your points" value={data.point} precision={0}/>
    </>
  );
}
