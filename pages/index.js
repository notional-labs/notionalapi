import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Link from "next/link";

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default function Home () {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
          <h1 className="title">
              Home page
          </h1>
        <section>
          <p>Dummy home page</p>
        </section>
      </Layout>
  );
}
