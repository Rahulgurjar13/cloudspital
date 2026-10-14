import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { getProductBySlug, listProducts } from "@/lib/db/products";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { ProductSchema } from "@/components/schema/ProductSchema";
import { PRODUCT_REGISTRY } from "@/lib/products-data";
import { PRODUCTS } from "@/lib/site-structure";
import { ProductDetailsView } from "./ProductDetailsView";

export const dynamic="force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  
  const registry = PRODUCT_REGISTRY[slug];
  return pageMetadata({
    title: product.seoTitle || product.name,
    description: product.metaDescription || product.description || registry?.tagline,
    path: `/products/${slug}/`,
    ogImage: product.image,
    type: "website",
  });
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  // If the product is not in DB or not published, try loading it from static registry 
  // as a fallback (so pages work even before DB syncing finishes).
  const registryDetails = PRODUCT_REGISTRY[slug];
  
  if (!product && !registryDetails) {
    notFound();
  }

  // Build current product data object, merging DB values with registry values
  const currentProduct = {
    slug: slug,
    name: product?.name || (registryDetails ? registryDetails.slug === "health-kiosk" ? "Cloudspital Point-of-Care Health Kiosk" : (PRODUCTS.find((p) => p.slug === registryDetails.slug)?.name ?? registryDetails.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")) : ""),
    description: product?.description || registryDetails?.tagline || "",
    body: product?.body || undefined,
    image: product?.image || undefined,
  };

  const path = `/products/${slug}/`;

  // Fetch sibling products from DB for the comparison section
  const dbProducts = await listProducts();
  const rawSiblings = dbProducts.filter((p) => p.slug !== slug);
  
  const siblingProducts = rawSiblings.map((p) => {
    return {
      slug: p.slug,
      name: p.name,
      image: p.image || undefined,
    };
  });

  return (
    <article>
      <ProductSchema
        name={currentProduct.name}
        description={currentProduct.description}
        url={SITE.url + path}
        image={currentProduct.image}
      />
      
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
          { name: currentProduct.name, path },
        ]}
      />

      <ProductDetailsView
        product={currentProduct}
        registryDetails={registryDetails}
        siblingProducts={siblingProducts}
      />
    </article>
  );
}
