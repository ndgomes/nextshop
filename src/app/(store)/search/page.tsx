import { api } from "@/data/api";
import { Product } from "@/data/products/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: { q: string };
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60, // cached for 1 hour
    },
  });

  const products = await response.json();
  return products;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = searchParams;

  if (!query) redirect("/");

  const products = await searchProducts(query);

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="mt-8 text-sm">No products found</p>
        <Link href="/" className="text-sm font-semibold text-emerald-500">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Search for: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
            >
              <div className="group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={product.image}
                  alt=""
                  width={450}
                  height={450}
                  quality={100}
                />
              </div>

              <div className="absolute bottom-10 right-10 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                <span className="text-sm truncate">{product.title}</span>
                <span className="flex h-full items-center justify-center rounded-full bg-emerald-500 px-4 font-semibold">
                  {product.price.toLocaleString("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
