import fs from 'fs';
import path from 'path';
import * as matter from "gray-matter";

import Layout from "../components/Layout";
import Link from 'next/link';
import Post from '../components/Post';

export default function Home({ posts }) {
  console.log(posts)
  return (
      <Layout>
          <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, index) => {
                  return <Post post={post} key={index}/>
              })}
          </div>

          <Link href="/blog">
              <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full">
                  All Posts
              </a>
          </Link>
      </Layout>
  );
}



export async function getStaticProps() {

  const files = fs.readdirSync(path.resolve(process.cwd(), 'posts'));
  
  const posts = files.map(file => {
    const slug = file.replace(".md", "");

    const post = fs.readFileSync(path.resolve(process.cwd(), 'posts', file), 'utf8');
    const { data: frontmatter, content } = matter(post);
    
    return {
      slug,
      frontmatter,
    };
  })

  return {
      props: {
          posts: posts
              .sort(
                  (a, b) =>
                      new Date(b.frontmatter.date) -
                      new Date(a.frontmatter.date)
              )
              .slice(0, 3),
      },
  };
}
