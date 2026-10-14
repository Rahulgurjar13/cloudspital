import { notFound } from "next/navigation";
import { getProductById } from "@/lib/db/products";
import { isValidId } from "@/lib/db/serialize";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProductAction } from "../actions";

export const dynamic="force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditProduct({ params }: Params) {
  const { id } = await params;
  if (!isValidId(id)) notFound();

  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-white">
        Edit product
      </h1>
      <ProductForm
        action={updateProductAction.bind(null, id)}
        product={product}
      />
    </div>
  );
}
