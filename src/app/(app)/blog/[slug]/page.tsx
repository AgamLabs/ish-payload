import { notFound } from "next/navigation";
import { Metadata } from "next";

import RichText from "@/components/RichText";
import { Media } from "@/components/Media";
import { HighImpactHero } from "../../../../heros/HighImpact";
import { formatDate } from "@/lib/formatDate";
import configPromise from "@payload-config";
import { getPayload } from "payload";

import type { Post } from "@/payload-types";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const { docs: posts } = await payload.find({
    collection: "posts",
    limit: 100,
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  return posts.map(({ slug }) => ({ slug }));
}

// export async function generateMetadata({
//   params: { slug },
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const payload = await getPayload({ config: configPromise });
//   const { docs: posts } = await payload.find({
//     collection: "posts",
//     where: {
//       slug: {
//         equals: slug,
//       },
//       _status: {
//         equals: "published",
//       },
//     },
//     limit: 1,
//   });

//   const post = posts[0];

//   if (!post) {
//     return {};
//   }

//   return {
//     title: post.meta?.title || post.title,
//     description: post.meta?.description,
//     openGraph: {
//       title: post.meta?.title || post.title,
//       description: post.meta?.description,
//       type: "article",
//       publishedTime: post.publishedAt,
//       images: post.meta?.image
//         ? [
//             {
//               url: (post.meta.image as any)?.url || "",
//               width: 1200,
//               height: 630,
//             },
//           ]
//         : [],
//     },
//   };
// }

type Args = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPost({ params }: Args ) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  const { docs: posts } = await payload.find({
    collection: "posts",
    where: {
      slug: {
        equals: slug,
      },
      _status: {
        equals: "published",
      },
    },
    depth: 2,
    limit: 1,
  });

  const post = posts[0];

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-12">
        {post.heroImage && typeof post.heroImage === "object" && (
          <div className="mb-8">
            <Media resource={post.heroImage} priority />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          )}
          {post.populatedAuthors && post.populatedAuthors.length > 0 && (
            <div className="flex items-center gap-2">
              {post.populatedAuthors.map((author) => (
                <span key={author.id}>{author.name}</span>
              ))}
            </div>
          )}
        </div>
        {post.categories && post.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((category) => {
              // Handle both number references and populated Category objects
              if (typeof category === "number") {
                return (
                  <span
                    key={category}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    Category #{category}
                  </span>
                );
              }

              // Now TypeScript knows category is a Category object
              return (
                <span
                  key={category.id}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {category.title}
                </span>
              );
            })}
          </div>
        )}
      </header>

      <RichText
        data={post.content}
        enableGutter={false}
        enableProse={true}
        className="mt-8"
      />

      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {post.relatedPosts.map((relatedPost) => {
              if (typeof relatedPost === "number") {
                return (
                  <div
                    key={`ref-${relatedPost}`}
                    className="border rounded-lg p-6"
                  >
                    <h3 className="text-xl font-bold">Post #{relatedPost}</h3>
                    <p className="text-gray-600">Loading...</p>
                  </div>
                );
              }
              return <BlogCard key={relatedPost.id} post={relatedPost} />;
            })}
          </div>
        </section>
      )}
    </article>
  );
}

function BlogCard({ post }: { post: Post }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <a href={`/blog/${post.slug}`}>
        {typeof post.heroImage === "object" && post.heroImage && (
          <Media
            resource={post.heroImage}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          {post.publishedAt && (
            <time dateTime={post.publishedAt} className="text-sm text-gray-600">
              {formatDate(post.publishedAt)}
            </time>
          )}
        </div>
      </a>
    </div>
  );
}
