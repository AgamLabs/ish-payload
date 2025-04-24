import landing from "../../../../data/data";
import { ArrowForwardIos } from "@mui/icons-material";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Media } from "@/components/Media";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";

export default async function BlogSection() {
  const payload = await getPayload({ config: configPromise });

  const { docs: posts } = await payload.find({
    collection: "posts",
    limit: 6,
    where: {
      _status: {
        equals: "published",
      },
    },
    sort: "-publishedAt",
    depth: 2,
  });

  return (
    <section className="w-screen bg-white py-16 md:py-24 relative left-1/2 right-1/2 -mx-[50vw]">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {landing.sec6.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {landing.sec6.sub}
            </p>
          </div>
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-customBlue hover:bg-blue-700 text-white font-medium rounded-full transition-colors duration-200"
          >
            Read All Blogs
            <ArrowForwardIos className="ml-2" fontSize="small" />
          </Link>
        </div>

        {/* Blog Posts Grid - Full Width */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white w-full"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full w-full">
                  {/* Featured Image */}
                  {post.heroImage && typeof post.heroImage === "object" && (
                    <div className="aspect-video w-full overflow-hidden">
                      <Media
                        resource={post.heroImage}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 w-full">
                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3 w-full">
                        {post.categories.map((category) => (
                          <span
                            key={typeof category === 'object' ? category.id : category}
                            className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full"
                          >
                            {typeof category === 'object' ? category.title : `Category #${category}`}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 w-full">
                      {post.title}
                    </h3>

                    {/* Date */}
                    {post.publishedAt && (
                      <p className="text-sm text-gray-500 mb-4">
                        {formatDate(post.publishedAt)}
                      </p>
                    )}

                    {/* Excerpt */}
                    <p className="text-gray-600 line-clamp-3 w-full">
                      {post.meta?.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}