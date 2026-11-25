import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getAllAvailableColors, queryProducts } from "@/lib/db/repository";
import { SectionHeading } from "@/components/SectionHeading";
import { ShopCatalogClient } from "@/components/ShopCatalogClient";

export const metadata: Metadata = {
  title: "Shop Sarees",
  description:
    "Browse Mul Cotton, Georgette, Semi Pattu, Designer, and Work Sarees at Aliveli Vasthralaya.",
};

export default async function ShopPage() {
  const [products, availableColors] = await Promise.all([
    queryProducts(),
    getAllAvailableColors(),
  ]);

  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Aliveli Vasthralaya Catalog"
          title="Explore Our Saree Collection"
          description="Filter by fabric category, occasion, or color palette, or reach out directly via WhatsApp for personalized recommendations."
        />

        <div className="mt-12">
          <Suspense
            fallback={
              <div className="py-12 text-center text-sm text-ink-muted">
                Loading saree catalog...
              </div>
            }
          >
            <ShopCatalogClient
              initialProducts={products}
              availableColors={availableColors}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
