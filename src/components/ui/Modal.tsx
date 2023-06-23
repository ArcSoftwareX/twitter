import { forwardRef, HTMLAttributes } from "react";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    modalOpen: boolean
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal({ children, modalOpen, ...props }, ref) {

    if (!modalOpen) return null

    return <div ref={ref} {...props}>
        { children }
    </div>
})