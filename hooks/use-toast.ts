import { toast } from "sonner";

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}

export function useToast() {
  const showToast = ({
    title,
    description,
    variant = "default",
    duration = 4000,
  }: ToastOptions) => {
    const message =
      title && description
        ? `${title}: ${description}`
        : title || description || "";

    switch (variant) {
      case "destructive":
        return toast.error(message, { duration });
      case "success":
        return toast.success(message, { duration });
      default:
        return toast(message, { duration });
    }
  };

  return {
    toast: showToast,
  };
}
