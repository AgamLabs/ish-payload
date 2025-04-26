import { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Media } from "@/components/Media";
import { formatDate } from "@/lib/formatDate";

// Define a custom type for searchParams
interface SearchParams {
  page?: string;
  category?: string;
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
  const category = params?.category;
  const search = params?.search;

  const payload = await getPayload({ config: configPromise });

  const { docs: posts, totalPages } = await payload.find({
    collection: "posts",
    limit: 9,
    page,
    where: {
      _status: { equals: "published" },
      ...(category && { categories: { in: [category] } }),
      ...(search && { title: { contains: search } }),
    },
    sort: "-publishedAt",
    depth: 1,
  });

  const { docs: categories } = await payload.find({
    collection: "categories",
    limit: 100,
  });

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Blog Posts</h1>

      <form className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search posts..."
            className="flex-1 max-w-md px-4 py-2 border rounded-lg"
            defaultValue={search || ""}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/blog"
          className={`px-4 py-2 rounded ${
            !category
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All Categories
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/blog?category=${cat.id}`}
            className={`px-4 py-2 rounded ${
              category === String(cat.id)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories?.map((cat) => {
                    const isCategoryObj =
                      typeof cat === "object" &&
                      cat !== null &&
                      "id" in cat &&
                      "title" in cat;

                    return (
                      <span
                        key={isCategoryObj ? cat.id : cat}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {isCategoryObj ? cat.title : `Category #${cat}`}
                      </span>
                    );
                  })}
                </div>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {post.publishedAt && formatDate(post.publishedAt)}
                </p>
                <p className="text-gray-700 line-clamp-2">
                  {post.meta?.description || "No description available."}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i}
                href={{
                  pathname: "/blog",
                  query: {
                    ...(category && { category }),
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
        </div>
      )}
    </section>
  );
}
