'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type { BlogPost } from '../blog-data';

type ArticleDetailsClientProps = {
  post: BlogPost;
  allPosts: BlogPost[];
};

export function ArticleDetailsClient({ post, allPosts }: ArticleDetailsClientProps) {
  const { t, language } = useTranslation();

  const getTitle = (post: BlogPost) => (language === 'en' ? post.title_en : post.title_kh);
  const getExcerpt = (post: BlogPost) => (language === 'en' ? post.excerpt_en : post.excerpt_kh);
  const getCategory = (post: BlogPost) => (language === 'en' ? post.category_en : post.category_kh);
  const getContent = (post: BlogPost) => (language === 'en' ? post.content_en : post.content_kh);
  const getQuote = (post: BlogPost) => (language === 'en' ? post.quote_en : post.quote_kh);

  const postTitle = getTitle(post);
  const postExcerpt = getExcerpt(post);
  const postCategory = getCategory(post);
  const postContent = getContent(post);
  const postQuote = getQuote(post);

  const otherPosts = allPosts.filter((p) => p.id !== post.id);
  const sidebarFeatured = otherPosts[0];
  const sidebarList = otherPosts.slice(1, 5);
  const bottomPosts = otherPosts.slice(0, 8);

  const getPostInfo = (item: BlogPost) => ({
    title: getTitle(item),
    category: getCategory(item),
    excerpt: getExcerpt(item),
  });

  return (
    <>
      <main className="bg-background">
        <div className="border-b-4 border-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('news.backToNews', 'Back to News')}
            </Link>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end py-3 border-b border-border text-xs text-muted-foreground uppercase tracking-widest">
              <span>{post.date}</span>
            </div>
            <div className="py-4 sm:py-6 text-center">
              <div className="inline-block bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest px-3 py-1 mb-3">
                {postCategory}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground tracking-tight leading-none max-w-5xl mx-auto">
                {postTitle}
              </h1>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground mb-10">
                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{post.author}</span>
                <span className="w-px h-4 bg-border" />
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
              </div>
              <div className="relative w-full h-72 sm:h-96 lg:h-[520px] overflow-hidden">
                <Image
                  src={post.image}
                  alt={postTitle}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <article className="lg:col-span-8 border-r-0 lg:border-r border-border lg:pr-16">
              <p className="text-lg sm:text-xl text-foreground font-medium leading-relaxed mb-6 first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-primary first-letter:leading-none">
                {postExcerpt}
              </p>

              <div className="h-px bg-border my-6" />

              {postQuote && (
                <blockquote className="border-l-4 border-primary pl-6 my-8">
                  <p className="text-xl sm:text-2xl font-bold text-foreground italic leading-snug">
                    {postQuote}
                  </p>
                </blockquote>
              )}

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {postContent.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="h-px bg-border my-8" />

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <h2 className="text-xl font-black text-foreground uppercase tracking-wide">
                  {t('news.articleHeadingLookingAhead', 'Looking Ahead')}
                </h2>
                <p>
                  {t(
                    'news.articleFutureParagraph1',
                    'The next phase of innovation will centre on AI-driven demand forecasting and blockchain-based provenance tracking.'
                  )}
                </p>
                <p>
                  {t(
                    'news.articleFutureParagraph2',
                    'Early adopters in our network are already reporting significant reductions in waste and spoilage.'
                  )}
                </p>
                <p>
                  {t(
                    'news.articleFutureParagraph3',
                    'As regulatory frameworks evolve, those with transparent, auditable supply chains will find approval processes far smoother.'
                  )}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4 p-5 rounded-lg border border-border bg-card">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg flex-shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-foreground">{post.author}</div>
                  <div className="text-sm text-muted-foreground">{postCategory} Contributor · Farmacosm</div>
                </div>
              </div>
            </article>

            <aside className="lg:col-span-4 space-y-8">
              {sidebarFeatured && (
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-foreground pb-2 mb-4">
                    {t('news.alsoIn', 'Also In')} {getCategory(sidebarFeatured)}
                  </div>
                  <Link href={`/news/${sidebarFeatured.id}`} className="group block">
                    <div className="relative h-44 rounded overflow-hidden mb-3">
                      <Image
                        src={sidebarFeatured.image}
                        alt={getTitle(sidebarFeatured)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-0.5">
                        {getCategory(sidebarFeatured)}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {getTitle(sidebarFeatured)}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{sidebarFeatured.date}</p>
                  </Link>
                </div>
              )}

              <div className="h-px bg-border" />

              <div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-foreground pb-2 mb-4">
                  {t('news.moreNews', 'More News')}
                </div>
                <div className="space-y-5">
                  {sidebarList.map((p, i) => (
                    <Link href={`/news/${p.id}`} key={p.id} className="group flex gap-3">
                      <span className="text-3xl font-black text-border leading-none select-none mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-wide">{getCategory(p)}</span>
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug mt-0.5 line-clamp-2">
                          {getTitle(p)}
                        </h4>
                        <span className="text-xs text-muted-foreground">{p.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-foreground pb-2 mb-4">
                  {t('news.browseCategory', 'Browse by Category')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(allPosts.map((p) => getCategory(p)))).map((cat) => (
                    <span key={cat} className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {bottomPosts.length > 0 && (
          <div className="border-t-4 border-foreground">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b-2 border-foreground pb-2 mb-8">
                {t('news.continueReading', 'Continue Reading')}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bottomPosts.map((p) => (
                  <Link href={`/news/${p.id}`} key={p.id} className="group">
                    <div className="relative h-36 rounded overflow-hidden mb-3">
                      <Image
                        src={p.image}
                        alt={getTitle(p)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-0.5">
                        {getCategory(p)}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {getTitle(p)}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{p.date}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity rounded"
                >
                  {t('news.viewAllNews', 'View All News')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
