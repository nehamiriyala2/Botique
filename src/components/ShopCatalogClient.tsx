"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { COLLECTIONS, OCCASIONS } from "@/data/catalog";
import { Product } from "@/lib/db/schema";
import { ProductCard } from "@/components/ProductCard";

interface ShopCatalogClientProps {
  initialProducts: Product[];
  availableColors: Array<{ name: string; hex: string }>;
}

export function ShopCatalogClient({
  initialProducts,
  availableColors,
}: ShopCatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCollection, setSelectedCollection] = useState(
    searchParams.get("collection") ?? "all"
  );
  const [selectedOccasion, setSelectedOccasion] = useState(
    searchParams.get("occasion") ?? "all"
  );
  const [selectedColor, setSelectedColor] = useState(
    searchParams.get("color") ?? "all"
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") ?? ""
  );
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "name-asc"
  >("featured");

  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    if (selectedCollection !== "all") {
      list = list.filter((p) => p.collectionSlug === selectedCollection);
    }

    if (selectedOccasion !== "all") {
      list = list.filter((p) =>
        p.occasions.includes(selectedOccasion as Product["occasions"][number])
      );
    }

    if (selectedColor !== "all") {
      const target = selectedColor.toLowerCase();
      list = list.filter((p) =>
        p.colors.some((c) => c.name.toLowerCase() === target)
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.collectionName.toLowerCase().includes(term) ||
          p.fabric.toLowerCase().includes(term) ||
          p.shortDescription.toLowerCase().includes(term) ||
          p.colors.some((c) => c.name.toLowerCase().includes(term))
      );
    }

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => {
          if (a.price === null && b.price === null) return a.sortOrder - b.sortOrder;
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return a.price - b.price;
        });
        break;
      case "price-desc":
        list.sort((a, b) => {
          if (a.price === null && b.price === null) return a.sortOrder - b.sortOrder;
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return b.price - a.price;
        });
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        list.sort((a, b) => a.sortOrder - b.sortOrder);
        break;
    }

    return list;
  }, [
    initialProducts,
    selectedCollection,
    selectedOccasion,
    selectedColor,
    searchTerm,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCollection("all");
    setSelectedOccasion("all");
    setSelectedColor("all");
    setSearchTerm("");
    setSortBy("featured");
    router.replace("/shop", { scroll: false });
  };

  const hasActiveFilters =
    selectedCollection !== "all" ||
    selectedOccasion !== "all" ||
    selectedColor !== "all" ||
    searchTerm.trim().length > 0;

  return (
    <div className="space-y-8">
      {/* Sample Catalog Banner */}
      <div className="bg-ivory border border-gold/40 px-5 py-3.5 text-xs text-ink-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>
          <strong className="text-maroon uppercase tracking-wider">
            Sample Catalog Mode:
          </strong>{" "}
          Displaying clearly marked sample listings until live store inventory and final pricing are uploaded.
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-maroon hover:underline font-medium shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setSelectedCollection("all")}
          className={`px-4 py-2 text-xs uppercase tracking-[0.16em] border transition-colors ${
            selectedCollection === "all"
              ? "bg-maroon text-ivory border-maroon"
              : "bg-white text-ink border-gold/35 hover:border-maroon"
          }`}
        >
          All Sarees
        </button>
        {COLLECTIONS.map((col) => (
          <button
            key={col.id}
            type="button"
            onClick={() => setSelectedCollection(col.slug)}
            className={`px-4 py-2 text-xs uppercase tracking-[0.16em] border transition-colors ${
              selectedCollection === col.slug
                ? "bg-maroon text-ivory border-maroon"
                : "bg-white text-ink border-gold/35 hover:border-maroon"
            }`}
          >
            {col.name}
          </button>
        ))}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-ivory/60 border border-gold/25 p-4">
        {/* Search Input */}
        <div className="md:col-span-4 relative">
          <Search className="w-4 h-4 text-maroon absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search fabric, color, or saree..."
            aria-label="Search sarees"
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
          />
        </div>

        {/* Occasion Filter */}
        <div className="md:col-span-3">
          <select
            value={selectedOccasion}
            onChange={(e) => setSelectedOccasion(e.target.value)}
            aria-label="Filter by occasion"
            className="w-full px-3 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
          >
            <option value="all">All Occasions</option>
            {OCCASIONS.map((occ) => (
              <option key={occ.id} value={occ.slug}>
                {occ.name}
              </option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div className="md:col-span-3">
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            aria-label="Filter by color"
            className="w-full px-3 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
          >
            <option value="all">All Colors</option>
            {availableColors.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="md:col-span-2 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-maroon shrink-0 hidden sm:block" />
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value as
                  | "featured"
                  | "price-asc"
                  | "price-desc"
                  | "name-asc"
              )
            }
            aria-label="Sort sarees"
            className="w-full px-3 py-2.5 text-sm bg-white border border-gold/35 focus:border-maroon focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-ink-muted">
        <span>
          Showing {filteredProducts.length} of {initialProducts.length} sarees
        </span>
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-ivory/50 border border-gold/25">
          <p className="font-serif text-2xl text-maroon">
            No matching sarees found
          </p>
          <p className="text-sm text-ink-muted mt-2">
            Try clearing one or more filters to view all available collections.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 px-6 py-2.5 bg-maroon text-ivory text-xs uppercase tracking-[0.18em] hover:bg-maroon-dark transition-colors"
          >
            View All Sarees
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
