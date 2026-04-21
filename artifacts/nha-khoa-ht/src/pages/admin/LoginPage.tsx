import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { useAdminLogin } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { CLINIC_NAME } from "@/lib/api";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const login = useAdminLogin();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: { email: "admin@nhakhoaht.vn", password: "admin123" },
  });

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-[hsl(215,80%,35%)] to-[hsl(215,80%,20%)] p-4">
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            const res = await login.mutateAsync({ data });
            if (res.authenticated) {
              toast({ title: "Đăng nhập thành công" });
              setLocation("/admin");
            } else {
              toast({ title: "Sai thông tin", variant: "destructive" });
            }
          } catch {
            toast({ title: "Sai email hoặc mật khẩu", variant: "destructive" });
          }
        })}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[hsl(215,80%,35%)] text-white grid place-items-center font-bold text-2xl mb-3">
            HT
          </div>
          <h1 className="text-2xl font-bold text-[hsl(215,80%,20%)]">
            {CLINIC_NAME} Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1">Đăng nhập quản trị hệ thống</p>
        </div>
        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 outline-none focus:border-[hsl(215,80%,35%)]"
            />
          </div>
        </label>
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Mật khẩu</span>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              {...register("password", { required: true })}
              type="password"
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 outline-none focus:border-[hsl(215,80%,35%)]"
            />
          </div>
        </label>
        <button
          disabled={isSubmitting}
          className="w-full py-2.5 bg-[hsl(215,80%,35%)] text-white font-semibold rounded-md hover:bg-[hsl(215,80%,30%)] transition disabled:opacity-60"
        >
          ĐĂNG NHẬP
        </button>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Tài khoản mặc định: <strong>admin@nhakhoaht.vn</strong> / <strong>admin123</strong>
        </p>
      </form>
    </div>
  );
}
