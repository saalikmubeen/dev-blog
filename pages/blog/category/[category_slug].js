import fs from "fs";
import path from "path";
import * as matter from "gray-matter";

import Layout from "../../../components/Layout";
import Link from "next/link";
import Post from "../../../components/Post";
import CategoryList from "../../../components/CategoryList";

export default function Posts({ posts, category, categories }) {
    return (
        <Layout>
            <div className="flex justify-between">

                <div className="w-3/4 mr-10">

                    <h1 className="text-5xl border-b-4 p-5 font-bold">
                        Posts in {category}
                    </h1>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {posts.map((post, index) => {
                            return <Post post={post} key={index} />;
                        })}
                    </div>

                </div>

                <div className="w-1/4">
                    <CategoryList categories={categories} />
                </div>
            </div>

        </Layout>
    );
}


export async function getStaticPaths() {

    const files = fs.readdirSync(path.resolve(process.cwd(), "posts"));

   const paths = files.map((file) => {
       const post = fs.readFileSync(
           path.resolve(process.cwd(), "posts", file),
           "utf8"
       );

       const { data: frontmatter } = matter(post);

       return {
           params: {category_slug: frontmatter.category.toLowerCase()},
       }
   });

    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params }) {
    
    const files = fs.readdirSync(path.resolve(process.cwd(), "posts"));

    const categories = []

    const posts = files.map((file) => {
        const slug =  file.replace(".md", "");

        const post = fs.readFileSync(
            path.resolve(process.cwd(), "posts", file),
            "utf8"
        );
        const { data: frontmatter } = matter(post);

        categories.push(frontmatter.category)

        return {
            slug,
            frontmatter,
        };
    });

    const categoryPosts = posts.filter((post) => {
        return post.frontmatter.category.toLowerCase() === params.category_slug;
    }).sort(
                (a, b) =>
                    new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
            )

    return {
        props: {
            posts: categoryPosts,
            category: params.category_slug,
            categories: [...new Set(categories)],
        },
    };
}
