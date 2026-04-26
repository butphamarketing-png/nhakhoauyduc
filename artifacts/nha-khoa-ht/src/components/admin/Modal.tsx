import { type ReactNode, useEffect } from "react";
import { X } from "lucide-react";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/55 p-4 backdrop-blur-sm animate-in fade-in-0"
      onClick={onClose}
    >
      <div className="grid min-h-full place-items-center">
        <div
          className="w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-white/50 bg-white shadow-[0_24px_80px_rgba(15,23,42,.22)] animate-in zoom-in-95 slide-in-from-bottom-4 duration-200"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(215,80%,35%)]">Chỉnh sửa nội dung</div>
              <h3 className="mt-1 text-lg font-bold text-[hsl(215,80%,20%)]">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-h-[80vh] overflow-auto p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
