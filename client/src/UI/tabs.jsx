import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // Diseño cápsula para la lista de pestañas
        "inline-flex h-12 items-center justify-center rounded-full bg-blue-50/50 p-1 text-slate-500",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // El trigger activo se vuelve una burbuja blanca
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-bold transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("mt-2 outline-none animate-in fade-in-50 zoom-in-95 duration-300", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };