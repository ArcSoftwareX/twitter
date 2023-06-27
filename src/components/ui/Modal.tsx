import cn from "@/utils/cn";
import { forwardRef, HTMLAttributes } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal({ children, open, className, ...props }, ref) {

    if (!open) return null

    return createPortal(
        <div className="fixed inset-0 bg-blue-500/10 backdrop-blur-sm">
            <div ref={ref} className={cn('p-4 rounded-xl bg-black/90 min-w-[600px] max-w-[600px] max-h-[85vh] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', className)} {...props}>
                { children }
            </div>
        </div>,
        document.body
    )
})