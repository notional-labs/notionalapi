import { List, Button, Space, Modal } from 'antd';
import { useSession } from "next-auth/react";
import useSWR from 'swr';
import { useState } from 'react';
import Link from 'next/link';
const { confirm } = Modal;
import { ExclamationCircleFilled } from '@ant-design/icons';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function ApiKeys() {
  const {data: session, status} = useSession()
  const { data, error, isLoading } = useSWR('/api/my_apikeys', fetcher);

  if (status === "loading" || isLoading) return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Access Denied.</p>
  if (error) return <p>failed to load</p>

  const showConfirm = () => {
    confirm({
      title: 'Confirm',
      icon: <ExclamationCircleFilled />,
      content: 'continue to delete this ApiKey?',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <>
      <Space>
        <h3>Api-Keys</h3>
        <Link href='/create_apikey'><Button>New Key</Button></Link>
      </Space>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="text" onClick={() => {
                Modal.info({title: 'Api Key', content: (<>{item.apikey}</>)});
              }}>Show Key</Button>,
              <Button type="text" onClick={showConfirm}>Delete</Button>]}
          >
            <List.Item.Meta
              title={item.name}
              description={<div>{item.note}<br/>{item.created_at}</div>}
            />
          </List.Item>
        )}
      />
    </>
  );
}
