import { List, Button, Space, Modal, message } from 'antd';
import { useSession } from "next-auth/react";
import useSWR from 'swr';
import { useState } from 'react';
import Link from 'next/link';
const { confirm } = Modal;
import { ExclamationCircleFilled } from '@ant-design/icons';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function ApiKeys() {
  const {data: session, status} = useSession();
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading, mutate } = useSWR('/api/my_apikeys', fetcher);
  const [messageApi, contextHolder] = message.useMessage();

  if (status === "loading" || isLoading) return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Access Denied.</p>
  if (error) return <p>failed to load</p>

  const showConfirm = (apikey) => {
    confirm({
      title: 'Confirm',
      icon: <ExclamationCircleFilled />,
      content: 'continue to delete this ApiKey?',
      onOk: async () => {
        try {
          setLoading(true);

          const rawResponse = await fetch('/api/delete_apikey', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({apikey}),
          });
          // const deletedApiKey = await rawResponse.json();

          messageApi.open({type: 'success', content: 'ApiKey deleted!'});
        } catch (e) {
          messageApi.open({type: 'error', content: `something wrong (${e.message})`});
        } finally {
          // always refresh
          await mutate('/api/my_apikeys');
          setLoading(false);
        }

      },
      // onCancel() {
      //   console.log('Cancel');
      // },
    });
  };

  return (
    <>
      {contextHolder}
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
              <Button type="text" onClick={() => {
                showConfirm(item.apikey);
              }}>Delete</Button>]}
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
