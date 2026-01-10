import * as React from "react";

// Función auxiliar integrada para manejar clases
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Diseño de Burbuja: Bordes muy redondeados (3xl), fondo blanco y sombra suave
        "bg-white text-slate-900 flex flex-col gap-4 rounded-[35px] border border-blue-50 shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1.5 px-8 pt-8",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-xl font-black leading-tight tracking-tight text-slate-900", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-slate-500 leading-relaxed", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "ml-auto self-start",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-8 pb-4", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-8 pb-8 pt-2", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};