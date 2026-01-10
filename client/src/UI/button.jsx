import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// Función auxiliar para combinar clases (reemplaza a la carpeta /utils)
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const buttonVariants = cva(
  // Estilo Base: Bordes totalmente redondeados (burbuja), fuente negrita y animaciones
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none shadow-sm",
  {
    variants: {
      variant: {
        // Azul NextVision con sombra difuminada
        default: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 hover:shadow-lg",
        // Rojo suave para alertas
        destructive: "bg-red-500 text-white hover:bg-red-600",
        // El estilo "burbuja de cristal" (blanco con borde azul claro)
        outline: "border-2 border-blue-100 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-200",
        // Gris burbuja
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "hover:bg-blue-50 hover:text-blue-600 shadow-none",
        link: "text-blue-600 underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };