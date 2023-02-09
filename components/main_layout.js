import Head from 'next/head';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";
import { Layout, Menu, Avatar } from 'antd';
const {Header, Content, Footer} = Layout;
import { ShoppingOutlined, KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

const SessionTest = () => {
  const {data: session} = useSession()

  if (session) {
    return (
      <>Signed in as {session.user.email} <br/> session: {JSON.stringify(session)}</>
    )
  }
  return (
    <header>
      Not signed in!
    </header>
  )
}

const MainNav = () => {
  // const {data: session} = useSession()
  // if (session) {
    return (
      <Menu mode='horizontal'>
        <Menu.Item key='apikeys' icon={<KeyOutlined/>}>
          <Link href='/apikeys'> Api-Keys </Link>
        </Menu.Item>
        <Menu.Item key='points' icon={<ShoppingOutlined/>}>
          <Link href='/points'> Points </Link>
        </Menu.Item>
      </Menu>
    )
  // }
  // return (null)
}

const HeaderLoginButtons = () => {
  const {data: session} = useSession()
  if (session) {
    return (
      <Space wrap>
        <div><Avatar icon={<UserOutlined />} /> {session.user.email}</div>
        <Button onClick={() => signOut()}>Logout</Button>
      </Space>
    )
  }
  return (
    <Space wrap>
      <Button onClick={() => signIn()}>Login</Button>
      <Button type="link">Register</Button>
    </Space>
  )
}

export default function MainLayout({children}) {
  return (
    <Layout className="layout">
      <Head>
        <link rel="icon" href="/favicon.ico"/>
        <meta
          name="description"
          content="Notional Api"
        />
        <meta
          property="og:image"
          content="test content"
        />
        <meta name="og:title" content="Notional Api"/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>

      <Header style={{background: "white"}}>
        <div style={{ float: 'left', width: '120px', height: '31px', fontSize: 'large'}}><Link href='/'>NotionalApi</Link></div>
        <div style={{ float: 'right'}}><HeaderLoginButtons /></div>
        <MainNav />
      </Header>

      <Content style={{padding: '0'}}>
        <div style={{ minHeight: '280px', padding: '24px' }}>
          {children}
        </div>
      </Content>

      <Footer style={{textAlign: 'center', background: 'white'}}>notional.ventures<br/>
        <SessionTest />
      </Footer>
    </Layout>
  );
}
