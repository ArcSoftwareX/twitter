import cn from "@/utils/cn";
import { forwardRef, HTMLAttributes, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    close: () => void
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal({ children, close, className, ...props }, ref) {
    const inner = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => inner.current!, [])

    const closeAction = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') close()
    }, [close])

    const closeOutsideAction = useCallback((e: MouseEvent) => {
        if (!inner.current?.contains(e.target as Node)) close()
    }, [close, inner])

    useEffect(() => {
        window.addEventListener('keyup', closeAction)
        window.addEventListener('mousedown', closeOutsideAction)

        return () => {
            window.removeEventListener('keyup', closeAction)
            window.removeEventListener('mousedown', closeOutsideAction)
        }
    }, [closeAction, closeOutsideAction])

    return createPortal(
        <div className="fixed inset-0 bg-blue-500/10 backdrop-blur-sm">
            <div ref={inner} className={cn('p-4 rounded-xl bg-black/90 min-w-[600px] max-w-[600px] max-h-[85vh] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', className)} {...props}>
                { children }
            </div>
        </div>,
        document.body
    )
})