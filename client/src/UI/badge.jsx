import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// Función auxiliar integrada para manejar clases sin depender de /utils
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const badgeVariants = cva(
  // Estilos base: Bordes totalmente redondeados (burbuja), fuente negrita y padding suave
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-bold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 transition-all duration-300",
  {
    variants: {
      variant: {
        // Variante NextVision: Fondo azul muy claro con texto azul fuerte
        default:
          "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200",
        // Variante Suave: Para estados secundarios
        secondary:
          "border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200",
        // Variante Alerta: Para promociones o urgencias
        destructive:
          "border-transparent bg-red-100 text-red-700 hover:bg-red-200",
        // Variante Delineada: Burbuja transparente con borde azul claro
        outline:
          "border-blue-200 bg-transparent text-blue-600 hover:bg-blue-50",
        // Variante Éxito: Para "Pagado" o "Cita Confirmada"
        success:
          "border-transparent bg-green-100 text-green-700 hover:bg-green-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };