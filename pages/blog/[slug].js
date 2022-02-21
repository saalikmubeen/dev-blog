import fs from "fs"
import path from "path";
import Link from "next/link";
import {marked} from "marked"
import * as matter from "gray-matter";

import CategoryLabel from "../../components/CategoryLabel";
import Layout from "../../components/Layout";
import Image from "next/image";

const SinglePost = ({
    frontmatter: { title, category, date, cover_image, author, author_image },
    content
}) => {
    return (
        <Layout title={title}>
            <Link href="/blog">Go Back</Link>
            <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6 dark:text-white dark:bg-slate-800">

                <div className="flex justify-between items-center mt-4">
                    <h1 className="text-5xl mb-7">{title}</h1>
                    <CategoryLabel>{category}</CategoryLabel>
                </div>

                <Image src={cover_image} alt="cover image of post" className="w-full rounded" width={500} height={500} layout="responsive" />

                <div className="flex justify-between items-center bg-gray-100 p-2 my-8 dark:bg-slate-900">

                    <div className="flex items-center">
                        <img
                            src={author_image}
                            alt="author"
                            className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                        />
                        <h4>{author}</h4>
                    </div>

                    <div className="mr-4">{date}</div>
                </div>

                <div className="blog-text mt-2">
                    <div
                        dangerouslySetInnerHTML={{ __html: marked(content) }}
                    ></div>
                </div>
            </div>
        </Layout>
    );
};


export async function getStaticPaths() {
    const files = fs.readdirSync(path.resolve(process.cwd(), "posts"))

    const paths = files.map(file => {
        const slug = file.replace(".md", "")
        return { params: { slug } }
    })

    return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
    const file = fs.readFileSync(path.resolve(process.cwd(), "posts", `${params.slug}.md`), "utf8")

    const { data: frontmatter, content } = matter(file)

    return {
        props: {
            frontmatter,
            content,
        }
    }
}

export default SinglePost;