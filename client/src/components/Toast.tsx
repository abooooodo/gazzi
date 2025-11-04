import { useEffect } from "react";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";
import { announceToScreenReader } from "@/lib/accessibility";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  message,
  type = "info",
  duration = 5000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    // Announce to screen readers
    announceToScreenReader(message, type === "error" ? "assertive" : "polite");

    // Auto close after duration
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, type, duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5" aria-hidden="true" />,
    error: <XCircle className="w-5 h-5" aria-hidden="true" />,
    warning: <AlertCircle className="w-5 h-5" aria-hidden="true" />,
    info: <Info className="w-5 h-5" aria-hidden="true" />,
  };

  const colors = {
    success: "toast-success text-[var(--success)]",
    error: "toast-error text-[var(--destructive)]",
    warning: "toast-warning text-[var(--warning)]",
    info: "toast-info text-[var(--info)]",
  };

  return (
    <div
      className={`toast ${colors[type]} animate-slide-in-down`}
      role="alert"
      aria-live={type === "error" ? "assertive" : "polite"}
      aria-atomic="true"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-muted transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
          aria-label="إغلاق الإشعار"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
