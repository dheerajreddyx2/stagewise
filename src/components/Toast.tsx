import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning';

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastProps {
    toast: Toast;
    onClose: (id: string) => void;
}

export function ToastNotification({ toast, onClose }: ToastProps) {
    useEffect(() => {
        const duration = toast.duration || 4000;
        const timer = setTimeout(() => {
            onClose(toast.id);
        }, duration);

        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, onClose]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
    };

    const colors = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200',
        warning: 'bg-amber-50 border-amber-200',
    };

    return (
        <div
            className={`flex items-start gap-3 p-4 rounded-xl border-2 shadow-lg backdrop-blur-sm animate-slide-in-right ${colors[toast.type]}`}
            style={{
                minWidth: '300px',
                maxWidth: '400px',
                animation: 'slideInRight 0.3s ease-out',
            }}
        >
            <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
            <p className="flex-1 text-sm font-medium text-foreground">{toast.message}</p>
            <button
                onClick={() => onClose(toast.id)}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

interface ToastContainerProps {
    toasts: Toast[];
    onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
            {toasts.map((toast) => (
                <ToastNotification key={toast.id} toast={toast} onClose={onClose} />
            ))}
        </div>
    );
}
