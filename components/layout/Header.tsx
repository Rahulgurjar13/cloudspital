import { Navbar } from "./Navbar";
import { MobileTabBar } from "./MobileTabBar";
import { listProducts } from "@/lib/db/products";
import { PRODUCTS } from "@/lib/site-structure";

// Server component: load the published products for the dynamic dropdown.
// Falls back to the static list when the DB is empty/unconfigured so the
// navbar always has entries.
export async function Header() {
  const dbProducts = await listProducts();
  const products =
    dbProducts.length > 0
      ? dbProducts.map((p) => ({ slug: p.slug, name: p.name }))
      : PRODUCTS;

  return (
    <>
      <Navbar products={products} />
      <MobileTabBar products={products} />
    </>
  );
}
