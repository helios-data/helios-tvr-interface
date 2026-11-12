import { useEffect, useId, useRef, type ReactNode } from 'react';

interface DialogProps {
    open: boolean; //decides when the dialog is shown
    onClose: () => void; //called when the user closes it (esc)
    title: string;
    children: ReactNode; //the message
    actions?: ReactNode; //buttons in the footer
}

export const Dialog = ({ open, onClose, title, children, actions }: DialogProps) => {
    const ref = useRef<HTMLDialogElement>(null);
    //unique id that links the title to the dialog
    const titleId = useId();

    //keep <dialog> in sync with the open prop
    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    return (
        <dialog
            ref={ref}
            aria-labelledby={titleId}
            //fires whenever the dialog closes
            onClose={() => {
                if (open) onClose();
            }}

            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            
            className="m-auto w-full max-w-md overflow-hidden rounded-[5px] border border-[#ccc] bg-white p-0 text-[#111] shadow-[0_4px_12px_rgba(0,0,0,0.15)] backdrop:bg-black/50"
        >
            <div className="border-b border-[#ccc] bg-[#f5f5f5] px-4 py-3">
                <h2 id={titleId} className="m-0 text-lg font-semibold">{title}</h2>
            </div>
            <div className="p-4 text-sm">
                {children}
            </div>
            {actions && (
                <div className="flex justify-end gap-2 border-t border-[#ccc] px-4 py-3">
                    {actions}
                </div>
            )}
        </dialog>
    );
};
