import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreatePost,
  useDeletePost,
  useListPosts,
  useUpdatePost,
} from "@workspace/api-client-react";
import type { Post } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal } from "@/components/admin/Modal";
import { useToast } from "@/hooks/use-toast";
import { getPostBasePath, slugify } from "@/lib/site";

type FormData = { title: string; excerpt: string; content: string; imageUrl: string; category: string };

export function PostsAdmin() {
  const [q, setQ] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const { data: posts = [] } = useListPosts(q ? { q } : undefined);
  const create = useCreatePost();
  const update = useUpdatePost();
  const remove = useDeletePost();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editing, setEditing] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const imagePreview = watch("imageUrl");
  const contentPreview = watch("content");
  const titlePreview = watch("title");
  const categoryPreview = watch("category");
  const previewHref = titlePreview ? `${getPostBasePath(categoryPreview || "Kiến thức")}/${slugify(titlePreview)}` : null;

  const openCreate = () => {
    setEditing(null);
    reset({ title: "", excerpt: "", content: "", imageUrl: "", category: "Kiến thức" });
    setOpen(true);
  };

  const openEdit = (post: Post) => {
    setEditing(post);
    reset({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      category: post.category,
    });
    setOpen(true);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, data });
      } else {
        await create.mutateAsync({ data });
      }
      toast({
        title: "Đã lưu bài viết",
        description: "Nội dung đã sẵn sàng cho trang public.",
      });
      setOpen(false);
      qc.invalidateQueries();
    } catch {
      toast({
        title: "Không thể lưu bài viết",
        description: "Vui lòng thử lại sau ít phút.",
        variant: "destructive",
      });
    }
  });

  return (
    <AdminLayout active="posts" title="Quản lý bài viết">
      <div className="rounded-[1.25rem] border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="w-full rounded-xl border py-2 pl-10 pr-4 sm:w-80"
            />
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-[hsl(215,80%,35%)] px-4 py-2 text-sm text-white shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Thêm bài viết
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">Ảnh</th>
                <th className="px-4 py-3">Tiêu đề</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Ngày tạo</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t">
                  <td className="px-4 py-3">
                    {post.imageUrl ? <img src={post.imageUrl} alt={post.title} className="h-12 w-16 rounded object-cover" /> : null}
                  </td>
                  <td className="max-w-md px-4 py-3 font-medium">{post.title}</td>
                  <td className="px-4 py-3 text-gray-500">{post.category}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(post.createdAt).toLocaleDateString("vi-VN")}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(post)} className="rounded p-2 hover:bg-gray-100">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <a
                      href={`${getPostBasePath(post.category)}/${slugify(post.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded p-2 text-[hsl(215,80%,35%)] hover:bg-[hsl(215,80%,96%)]"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      onClick={async () => {
                        if (!confirm(`Xóa bài viết "${post.title}"?`)) return;
                        await remove.mutateAsync({ id: post.id });
                        qc.invalidateQueries();
                        toast({ title: "Đã xóa bài viết" });
                      }}
                      className="rounded p-2 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Chưa có bài viết phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Sửa bài viết" : "Thêm bài viết"}>
        <form onSubmit={onSubmit} className="space-y-4">
          <input {...register("title", { required: true })} placeholder="Tiêu đề" className="w-full rounded-xl border px-3 py-2" />
          <input {...register("category")} placeholder="Danh mục" className="w-full rounded-xl border px-3 py-2" />
          <input {...register("imageUrl")} placeholder="URL ảnh" className="w-full rounded-xl border px-3 py-2" />
          {imagePreview ? <img src={imagePreview} alt="Xem trước bài viết" className="h-44 w-full rounded-lg border object-cover" /> : null}
          <textarea {...register("excerpt")} placeholder="Tóm tắt" rows={2} className="w-full rounded-xl border px-3 py-2" />
          <textarea {...register("content")} placeholder="Nội dung đầy đủ" rows={7} className="w-full rounded-xl border px-3 py-2" />
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="flex items-center gap-2 rounded-xl border px-4 py-2"
            >
              <Eye className="h-4 w-4" />
              Xem trước
            </button>
            {previewHref ? (
              <a
                href={previewHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-[hsl(215,80%,35%)]"
              >
                <ExternalLink className="h-4 w-4" />
                Xem ngoài site
              </a>
            ) : null}
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border px-4 py-2">
              Hủy
            </button>
            <button className="rounded-xl bg-[hsl(215,80%,35%)] px-4 py-2 text-white">Lưu</button>
          </div>
        </form>
      </Modal>

      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} title="Xem trước bài viết">
        <div className="space-y-4">
          {imagePreview ? <img src={imagePreview} alt="Xem trước" className="h-48 w-full rounded-lg object-cover" /> : null}
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[hsl(215,80%,35%)]">{categoryPreview || "Danh mục"}</div>
          <h3 className="text-2xl font-bold text-[hsl(215,80%,20%)]">{titlePreview || "Tiêu đề bài viết"}</h3>
          <p className="text-slate-600">{watch("excerpt") || "Chưa có tóm tắt."}</p>
          <div className="max-h-72 overflow-auto whitespace-pre-wrap rounded-lg border bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            {contentPreview || "Chưa có nội dung để xem trước."}
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
