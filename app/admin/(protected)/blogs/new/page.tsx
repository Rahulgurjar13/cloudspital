import { BlogForm } from "@/components/admin/BlogForm";
import { createBlogAction } from "../actions";

export default function NewBlog() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-white">
        New post
      </h1>
      <BlogForm action={createBlogAction} />
    </div>
  );
}
