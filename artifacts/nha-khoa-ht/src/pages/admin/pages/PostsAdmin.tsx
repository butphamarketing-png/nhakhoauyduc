import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useListPosts,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
} from "@workspace/api-client-react";
import type { Post } from "@workspace/api-client-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal } from "@/components/admin/Modal";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

type FormData = { title: string; excerpt: string; content: string; imageUrl: string; category: string };

export function PostsAdmin() {
  const [q, setQ] = useState("");
  const { data: posts = [] } = useListPosts(q ? { q } : undefined);
  const create = useCreatePost();
  const update = useUpdatePost();
  const remove = useDeletePost();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const openCreate = () => {
    setEditing(null);
    reset({ title: "", excerpt: "", content: "", imageUrl: "", category: "Kiến thức" });
    setOpen(true);
  };
  const openEdit = (p: Post) => {
    setEditing(p);
    reset(p);
    setOpen(true);
  };
  const onSubmit = handleSubmit(async (d) => {
    try {
      if (editing) await update.mutateAsync({ id: editing.id, data: d });
      else await create.mutateAsync({ data: d });
      toast({ title: "Đã lưu" });
      setOpen(false);
      qc.invalidateQueries();
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  });

  return (
    <AdminLayout active="posts" title="Quản lý Bài viết">
      <div className="bg-white rounded-xl border">
        <div className="flex flex-wrap justify-between items-center p-4 border-b gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm kiếm..."
              className="pl-10 pr-4 py-2 border rounded-md w-72"
            />
          </div>
          <button onClick={openCreate} className="px-4 py-2 bg-[hsl(215,80%,35%)] text-white rounded-md text-sm flex items-center gap-2">
            <Plus className="h-4 w-4" /> Thêm bài viết
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Ảnh</th>
              <th className="px-4 py-3">Tiêu đề</th>
              <th className="px-4 py-3">Danh mục</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3">
                  {p.imageUrl && <img src={p.imageUrl} className="w-16 h-12 object-cover rounded" />}
                </td>
                <td className="px-4 py-3 font-medium max-w-md">{p.title}</td>
                <td className="px-4 py-3 text-gray-500">{p.category}</td>
                <td className="px-4 py-3 text-gray-500">{new Date(p.createdAt).toLocaleDateString("vi-VN")}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(p)} className="p-2 hover:bg-gray-100 rounded">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm("Xoá?")) return;
                      await remove.mutateAsync({ id: p.id });
                      qc.invalidateQueries();
                    }}
                    className="p-2 hover:bg-rose-50 text-rose-600 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Sửa bài viết" : "Thêm bài viết"}>
        <form onSubmit={onSubmit} className="space-y-3">
          <input {...register("title", { required: true })} placeholder="Tiêu đề" className="w-full px-3 py-2 border rounded" />
          <input {...register("category")} placeholder="Danh mục" className="w-full px-3 py-2 border rounded" />
          <input {...register("imageUrl")} placeholder="URL ảnh" className="w-full px-3 py-2 border rounded" />
          <textarea {...register("excerpt")} placeholder="Tóm tắt" rows={2} className="w-full px-3 py-2 border rounded" />
          <textarea {...register("content")} placeholder="Nội dung đầy đủ" rows={6} className="w-full px-3 py-2 border rounded" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border rounded">Huỷ</button>
            <button className="px-4 py-2 bg-[hsl(215,80%,35%)] text-white rounded">Lưu</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
