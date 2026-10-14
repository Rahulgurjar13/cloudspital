"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowButton";
import { ProductMedia } from "./ProductMedia";

interface EnrichedProduct {
  slug: string;
  name: string;
  description: string;
  image?: string;
  category:"Health Kiosks" | "Telemedicine Carts" | "Portable Kits" | "Mobile Units";
  vitals: string[];
  abdmCompliant: boolean;
}

const CATEGORIES = ["All", "Health Kiosks", "Telemedicine Carts", "Portable Kits", "Mobile Units"] as const;

export function ProductsShowcase({ products }: { products: EnrichedProduct[] }) {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("All");

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const count = (category: typeof CATEGORIES[number]) =>
    category === "All" ? products.length : products.filter((p) => p.category === category).length;

  return (
    <div className="w-full">
      {/* Category filter */}
      <div role="group" aria-label="Filter products by category" className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 t-small transition-colors duration-300 ${
                isActive
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink hover:border-ink"
              }`}
            >
              {category}
              <span className={isActive ? "text-white/60" : "text-faint"}>{count(category)}</span>
            </button>
          );
        })}
      </div>

      {/* Products grid */}
      <div className="mt-8 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((p) => (
          <Link key={p.slug} href={`/products/${p.slug}/`} className="group flex h-full flex-col">
            <ProductMedia
              image={p.image}
              slug={p.slug}
              name={p.name}
              category={p.category}
              sizes="(min-width: 1280px) 320px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={p.slug === "health-kiosk" || p.slug === "medsync-iii-tele-icu-kiosk"}
              className="aspect-[4/3] sm:aspect-[4/5]"
            >
              <span className="absolute left-4 top-4 rounded-full bg-mist px-3 py-1 t-small text-ink">
                {p.category}
              </span>
              {p.abdmCompliant && (
                <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1 t-small text-white">
                  ABDM Compliant
                </span>
              )}
            </ProductMedia>

            <h3 className="mt-5 t-h5 text-ink">{p.name}</h3>
            <p className="mt-2 line-clamp-2 t-small text-muted">{p.description}</p>

            {p.vitals && p.vitals.length > 0 && (
              <div className="mt-5">
                <span className="block t-small text-muted">Screenings Support</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.vitals.slice(0, 3).map((v, i) => (
                    <span key={i} className="rounded-full border border-line px-2.5 py-0.5 text-[12px] text-ink">
                      {v}
                    </span>
                  ))}
                  {p.vitals.length > 3 && (
                    <span className="rounded-full bg-mist px-2.5 py-0.5 text-[12px] text-muted">
                      +{p.vitals.length - 3} More
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="mt-auto pt-5">
              <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                <span className="t-small text-ink">View Specifications</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
