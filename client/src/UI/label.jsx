import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-sm leading-none font-bold text-slate-700 select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2",
        className
      )}
      {...props}
    />
  );
}

export { Label };