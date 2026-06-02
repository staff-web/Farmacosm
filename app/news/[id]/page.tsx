import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/sections/cta";
import { ArticleDetailsClient } from "./article-client";
import { blogPosts } from "../blog-data";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: String(post.id),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === Number(id));
  if (!post) return {};
  return {
    title: `${post.title_en} | Farmacosm`,
    description: post.excerpt_en,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) return notFound();

  return (
    <>
     
      <main>
        <ArticleDetailsClient post={post} allPosts={blogPosts} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
