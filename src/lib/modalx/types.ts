import { type ReactNode } from "react"

export type ModalFactory = (inputs: ModalFactoryActions) => ReactNode
export type ModalState = {
    modals: { [name: string]: ModalFactory },
    currentModalId: string | null
}
export enum ModalActionKind {
    Close,
    Open,
    // Register
}
export type ModalAction = {
    type: ModalActionKind,
    payload?: number | ReactNode
}
export type ModalxGlobal = {
    openModal: (id: string) => void,
    closeModal: () => void,
    // registerModal: (modalFactory: ModalFactory) => ModalFactoryActions
}
export type ModalFactoryActions = { open: () => void, close: () => void }