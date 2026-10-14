import { notFound } from "next/navigation";
import { getBlogById } from "@/lib/db/blogs";
import { isValidId } from "@/lib/db/serialize";
import { BlogForm } from "@/components/admin/BlogForm";
import { updateBlogAction } from "../actions";

export const dynamic="force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditBlog({ params }: Params) {
  const { id } = await params;
  if (!isValidId(id)) notFound();

  const blog = await getBlogById(id);
  if (!blog) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-white">
        Edit post
      </h1>
      <BlogForm action={updateBlogAction.bind(null, id)} blog={blog} />
    </div>
  );
}
