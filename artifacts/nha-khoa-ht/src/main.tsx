import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

class RootErrorBoundary extends React.Component<
  React.PropsWithChildren,
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-white px-6 py-12 text-slate-900">
          <div className="mx-auto max-w-3xl rounded-3xl border border-rose-200 bg-rose-50 p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-rose-700">Trang đang gặp lỗi render</h1>
            <p className="mt-3 text-slate-700">
              Đây là lỗi runtime phía frontend. Nội dung bên dưới sẽ giúp mình xác định đúng nguyên nhân.
            </p>
            <pre className="mt-6 overflow-auto rounded-2xl bg-white p-4 text-sm text-slate-800">
              {this.state.error.stack || this.state.error.message}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>,
);
