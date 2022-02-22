import fs from "fs";
import path from "path";
import * as matter from "gray-matter";

import Layout from "../../../components/Layout";
import Link from "next/link";
import Post from "../../../components/Post";
import CategoryList from "../../../components/CategoryList";
import Pagination from "../../../components/Pagination";

const PER_PAGE = 3;

export default function PostsPerPage({ posts, categories, numPages, currentPage }) {
    return (
        <Layout>
            <div className="md:flex md:justify-between">
                <div className="md:w-3/4 w-full mr-10">
                    <h1 className="text-5xl border-b-4 p-5 font-bold">
                        All Posts
                    </h1>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {posts.map((post, index) => {
                            return <Post post={post} key={index} />;
                        })}
                    </div>

                    <Pagination numPages={numPages} currentPage={currentPage}/>
                </div>

                <div className="md:w-1/4 hidden md:block">
                    <CategoryList categories={categories} />
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const posts = fs.readdirSync(path.resolve(process.cwd(), "posts"));

    const numPages  = Math.ceil(posts.length / PER_PAGE);

    const paths = [];

    for (let i=1; i <= numPages; i++){
        paths.push({
            params: {
                page_index: i.toString()
            }
        })
    }

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps(context) {
    const files = fs.readdirSync(path.resolve(process.cwd(), "posts"));

    const categories = [];

    const posts = files.map((file) => {
        const slug = file.replace(".md", "");

        const post = fs.readFileSync(
            path.resolve(process.cwd(), "posts", file),
            "utf8"
        );
        const { data: frontmatter, content } = matter(post);

        categories.push(frontmatter.category);

        return {
            slug,
            frontmatter,
        };
    });


    const pageIndex =
        context.params && context.params.page_index
            ? parseInt(context.params.page_index)
            : 1;

    const numPages  = Math.ceil(posts.length / PER_PAGE);

    const currentPage = pageIndex;

    const skip = currentPage * PER_PAGE - PER_PAGE

    return {
        props: {
            posts: posts.sort(
                (a, b) =>
                    new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
            ).slice(skip, skip + PER_PAGE),
            categories: [...new Set(categories)],
            numPages,
            currentPage,
        },
    };
}
