import { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Media } from "@/components/Media";
import { formatDate } from "@/lib/formatDate";

// Define a custom type for searchParams
interface SearchParams {
  page?: string;
  search?: string;
}

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Read our latest articles and news",
};

export default async function BlogListPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | undefined; // Explicitly type as Promise
}) {
  const params = await searchParams; // Resolve the promise
  const page = parseInt(params?.page || "1", 10);
  const search = params?.search;

  const payload = await getPayload({ config: configPromise });

  const { docs: posts, totalPages } = await payload.find({
    collection: "posts",
    limit: 9,
    page,
    where: {
      _status: { equals: "published" },
      ...(search && { title: { contains: search } }),
    },
    sort: "-publishedAt",
    depth: 1,
  });

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Hero Image Section */}
      <div className="relative h-96 overflow-hidden rounded-lg mb-12">
        <img
          src="/media/ISH_blog.avif"
          alt="Hero Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Search Bar */}
      <form className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          name="search"
          placeholder="Search posts..."
          className="flex-1 px-4 py-2 border rounded-lg"
          defaultValue={search || ""}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full sm:w-auto"
        >
          Search
        </button>
      </form>

      {/* Blog Post Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.slug}`} className="block h-full">
              {post.heroImage && typeof post.heroImage === "object" && (
                <div className="h-48 overflow-hidden">
                  <Media
                    resource={post.heroImage}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {post.publishedAt && formatDate(post.publishedAt)}
                </p>
                <p className="text-gray-700 line-clamp-3">
                  {post.meta?.description || "No description available."}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-12 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={{
                pathname: "/blog",
                query: {
                  ...(search && { search }),
                  page: i + 1,
                },
              }}
              className={`px-4 py-2 rounded ${
                i + 1 === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}