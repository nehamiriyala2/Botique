import { NextRequest, NextResponse } from "next/server";
import { queryProducts } from "@/lib/db/repository";
import { ProductFilterQuery } from "@/lib/db/schema";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter: ProductFilterQuery = {
    collection: searchParams.get("collection") ?? undefined,
    occasion: searchParams.get("occasion") ?? undefined,
    color: searchParams.get("color") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    sort: (searchParams.get("sort") as ProductFilterQuery["sort"]) ?? "featured",
  };

  const products = await queryProducts(filter);
  return NextResponse.json({
    count: products.length,
    products,
  });
}
