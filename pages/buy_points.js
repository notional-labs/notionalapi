import { findUserByEmail } from "../helper/db";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { Divider, Radio, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const separateComma = (val) => {
  // remove sign if negative
  let sign = 1;
  if (val < 0) {
    sign = -1;
    val = -val;
  }
  // trim the number decimal point if it exists
  let num = val.toString().includes('.') ? val.toString().split('.')[0] : val.toString();
  let len = num.toString().length;
  let result = '';
  let count = 1;

  for (let i = len - 1; i >= 0; i--) {
    result = num.toString()[i] + result;
    if (count % 3 === 0 && count !== 0 && i !== 0) {
      result = ',' + result;
    }
    count++;
  }

  // add number after decimal point
  if (val.toString().includes('.')) {
    result = result + '.' + val.toString().split('.')[1];
  }
  // return result with - sign if negative
  return sign < 0 ? '-' + result : result;
}

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  const email = session.user.email;
  const user = await findUserByEmail(email);
  const {payment_code} = user;

  const data = {
    payment_code,
    price: parseInt(process.env.PRICE_PER_MILLION_POINTS)/1000000,
    address: process.env.WATCH_ADDR,
  }

  return {props: {status: "success", data}};
}

export default function BuyPoints(props) {
  const {data: session, status} = useSession();
  const {data} = props;

  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Access Denied.</p>
  if (props.status !== "success") return <p>Something wrong!</p>;

  const {payment_code, price, address} = data;

  return (
    <>
      <h3>Buy Points</h3>
      <Paragraph>
        Send USDC ibc asset on Osmosis network to address <Text mark code copyable>{address}</Text><br/>
        with Memo: <Text mark code copyable>{payment_code}</Text><br/>
      </Paragraph>
      <Divider />
      Price: {price} USDC for {separateComma(1000000)} points.<br/>
      For example, if you send 1 USDC, you will get {separateComma(66666)} points
    </>
  );
}
