import type { MetadataRoute } from "next";
import { SAMPLE_PRODUCTS } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://botique-mocha.vercel.app";
  const staticRoutes = [
    "",
    "/shop",
    "/collections",
    "/about",
    "/contact",
    "/cart",
    "/checkout",
    "/account",
    "/policies/privacy",
    "/policies/terms",
    "/policies/shipping",
    "/policies/returns",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = SAMPLE_PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
