import { List, Button, Space } from 'antd';
import { useSession } from "next-auth/react";

const data = [
  {
    name: 'Dev Api Key 1',
    key: '28e60dbef52d6c2a2fa385fa04c2cd0880a71517b5c4f0e2ed28efc393a9e9ce',
    desc: 'for development environment',
    created_date: '2022-03-25T12:00:00Z',
  },
  {
    name: 'Prod Api Key 1',
    key: '9b855c9035fbcba8e212b58b5f813402be54245041081c36b2d75a2344416095',
    desc: 'for production environment',
    created_date: '2023-01-20T15:00:00Z',
  },
];

export default function ApiKeys() {
  const {data: session, status} = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied.</p>
  }

  return (
    <>
      <Space>
        <h3>Api-Keys</h3>
        <Button>New Key</Button>
      </Space>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[<a key="list-view-key">Show Key</a>, <a key="list-delete-key">Delete</a>]}
          >
            <List.Item.Meta
              title={item.name}
              description={<div>{item.desc}<br/>{item.created_date}</div>}
            />
          </List.Item>
        )}
      />
    </>
  );
}
