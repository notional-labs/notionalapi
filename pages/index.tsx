import Head from "next/head";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { authAction, authSelector } from "../features/Auth/slice";

const DivTest = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;

const Main = styled.main`
  max-width: 768px;
  margin: 0 auto;
`;

export default function Home() {
  const dispatch = useDispatch();
  const { number } = useSelector(authSelector.getMe);
  const onClick = useCallback(() => {
    console.log("click");
    dispatch(authAction.test());
  }, []);
  return (
    <>
      <Head>
        <title>nextjs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <nav></nav>
        <Main>
          <DivTest onClick={onClick}>
            <span>{number}</span>
          </DivTest>
        </Main>
        <aside></aside>
      </div>
    </>
  );
}
