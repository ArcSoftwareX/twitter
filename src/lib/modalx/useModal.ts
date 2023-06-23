import { useContext } from "react"
import { ModalxContext } from "./ModalRenderer"

export const useModal = (id: string) => {
    const { openModal, closeModal } = useContext(ModalxContext)
    return { openModal: () => openModal(id), closeModal }
}