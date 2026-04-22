import {
  CircleCheck,
  CircleX,
  Info,
  LoaderCircle,
  TriangleAlert,
} from "lucide-react";
import type { CssVariable } from "next/dist/compiled/@next/font";
import { Toaster as ToasterComponent } from "sonner";

export function Toaster(...props: Parameters<typeof ToasterComponent>) {
  return (
    <ToasterComponent
      position="top-right"
      richColors
      visibleToasts={4}
      icons={{
        success: <CircleCheck size={18} />,
        info: <Info size={18} />,
        warning: <TriangleAlert size={18} />,
        error: <CircleX size={18} />,
        loading: <LoaderCircle size={18} />,
      }}
      style={{
        ["--success-bg" as CssVariable]: "var(--color-success)",
        ["--success-text" as CssVariable]: "var(--color-success-content)",
        ["--info-bg" as CssVariable]: "var(--color-info)",
        ["--info-text" as CssVariable]: "var(--color-info-content)",
        ["--warning-bg" as CssVariable]: "var(--color-warning)",
        ["--warning-text" as CssVariable]: "var(--color-warning-content)",
        ["--error-bg" as CssVariable]: "var(--color-error)",
        ["--error-text" as CssVariable]: "var(--color-error-content)",
      }}
      swipeDirections={["left", "right", "top"]}
      {...props}
    />
  );
}
