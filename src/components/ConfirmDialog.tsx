import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onCancel}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-scale-in">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                        <p className="text-muted-foreground text-sm">{message}</p>
                    </div>
                </div>

                <div className="flex gap-3 mt-6 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2.5 rounded-xl bg-accent text-foreground hover:bg-accent/80 font-medium transition-all"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium transition-all"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
