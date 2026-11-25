import { COLLECTIONS, OCCASIONS, SAMPLE_PRODUCTS } from "@/data/catalog";
import {
  OccasionCategory,
  Product,
  ProductFilterQuery,
  SareeCollection,
} from "@/lib/db/schema";

/**
 * Product Repository Abstraction
 * ------------------------------
 * Currently backed by structured sample catalog data (`SAMPLE_PRODUCTS`).
 * Swap these async functions with database queries (e.g. Prisma / Supabase / PostgreSQL)
 * without changing any UI component contracts.
 */

export async function getAllCollections(): Promise<SareeCollection[]> {
  return COLLECTIONS;
}

export async function getCollectionBySlug(
  slug: string
): Promise<SareeCollection | undefined> {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export async function getAllOccasions(): Promise<OccasionCategory[]> {
  return OCCASIONS;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return SAMPLE_PRODUCTS.filter((p) => p.featured).sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return SAMPLE_PRODUCTS.find((p) => p.slug === slug);
}

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  return SAMPLE_PRODUCTS.filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const aSameCol = a.collectionSlug === product.collectionSlug ? 0 : 1;
      const bSameCol = b.collectionSlug === product.collectionSlug ? 0 : 1;
      return aSameCol - bSameCol || a.sortOrder - b.sortOrder;
    })
    .slice(0, limit);
}

export async function queryProducts(
  query: ProductFilterQuery = {}
): Promise<Product[]> {
  let results = [...SAMPLE_PRODUCTS];

  if (query.collection && query.collection !== "all") {
    results = results.filter((p) => p.collectionSlug === query.collection);
  }

  if (query.occasion && query.occasion !== "all") {
    results = results.filter((p) =>
      p.occasions.includes(query.occasion as Product["occasions"][number])
    );
  }

  if (query.color && query.color !== "all") {
    const colorTarget = query.color.toLowerCase();
    results = results.filter((p) =>
      p.colors.some((c) => c.name.toLowerCase() === colorTarget)
    );
  }

  if (query.search && query.search.trim().length > 0) {
    const term = query.search.trim().toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.collectionName.toLowerCase().includes(term) ||
        p.fabric.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term) ||
        p.colors.some((c) => c.name.toLowerCase().includes(term))
    );
  }

  switch (query.sort) {
    case "price-asc":
      results.sort((a, b) => {
        if (a.price === null && b.price === null) return a.sortOrder - b.sortOrder;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
      });
      break;
    case "price-desc":
      results.sort((a, b) => {
        if (a.price === null && b.price === null) return a.sortOrder - b.sortOrder;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return b.price - a.price;
      });
      break;
    case "name-asc":
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "featured":
    default:
      results.sort((a, b) => a.sortOrder - b.sortOrder);
      break;
  }

  return results;
}

export async function getAllAvailableColors(): Promise<
  Array<{ name: string; hex: string }>
> {
  const map = new Map<string, string>();
  for (const product of SAMPLE_PRODUCTS) {
    for (const color of product.colors) {
      if (!map.has(color.name)) {
        map.set(color.name, color.hex);
      }
    }
  }
  return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
}
