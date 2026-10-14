import { ProductForm } from "@/components/admin/ProductForm";
import { createProductAction } from "../actions";

export default function NewProduct() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-white">
        New product
      </h1>
      <ProductForm action={createProductAction} />
    </div>
  );
}
