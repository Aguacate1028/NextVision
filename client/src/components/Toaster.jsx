import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  // Eliminamos useTheme para simplificar en Vite
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-900 group-[.toaster]:border-blue-100 group-[.toaster]:shadow-lg group-[.toaster]:rounded-[20px]",
          description: "group-[.toast]:text-slate-500",
          actionButton: "group-[.toast]:bg-blue-600 group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-600",
        },
      }}
      style={{
        "--normal-bg": "var(--card)",
        "--normal-text": "var(--foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export default Toaster;