import Head from "next/head";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authAction, authSelector } from "../features/Auth/slice";

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
        <div style={{  maxWidth: "768px", margin: "0 auto" }}>
          <div style={{  width: "100px", height: "100px", backgroundColor: "red"}} onClick={onClick}>
            <span>{number}</span>
          </div>
        </div>
        <aside></aside>
      </div>
    </>
  );
}
