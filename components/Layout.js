import Head from 'next/head'
import Header from './Header';
import Search from './SEarch';

const Layout = ({title, children, keywords, description}) => {
  return (
      <>
          <Head>
              <title>{title}</title>
              <meta name="keywords" content={keywords} />
              <meta name="description" content={description} />
              <link rel="icon" href="/favicon.ico" />
          </Head>

          <Header/>
          <Search/>

          <main className='container mx-auto my-7'>{children}</main>
      </>
  );
}


Layout.defaultProps = {
    title: "Welcome to Dev Blog",
    description: "Blog about web development and programming",
    "keywords": "development, coding, programming, javascript, next.js",
}

export default Layout