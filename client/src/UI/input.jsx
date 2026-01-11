import * as React from "react";

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Estilo Burbuja: h-11 para mayor altura, rounded-full y bordes azules claros
        "flex h-11 w-full rounded-full border border-blue-100 bg-white px-6 py-2 text-base shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-blue-400 focus:ring-4 focus:ring-blue-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };