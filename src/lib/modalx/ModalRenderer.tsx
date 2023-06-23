'use client'

import { ReactNode, createContext, useEffect, useReducer, useRef } from "react";
import { ModalAction, ModalActionKind, ModalFactory, ModalState, ModalxGlobal } from "./types";
import { createPortal } from "react-dom";

export const ModalxContext = createContext<ModalxGlobal>(null!)

function modalsStateReducer(state: ModalState, action: ModalAction): ModalState {
    switch (action.type) {
        case ModalActionKind.Open:
            if (!action.payload) throw new Error('No modal id provided to open')
            if (typeof action.payload !== 'string') throw new Error('Modal id should be of type string')
            return { ...state, currentModalId: action.payload }
        case ModalActionKind.Close: return { ...state, currentModalId: null }
    }
}

export default function ModalxProvider({ children, modals }: { children: ReactNode, modals: { [name: string]: ModalFactory } }) {
    const [modalsState, dispatch] = useReducer(modalsStateReducer, {
        modals,
        currentModalId: null
    })

    const closeModal = () => {
        dispatch({ type: ModalActionKind.Close })
    }

    const openModal = (id: string) => {
        dispatch({ type: ModalActionKind.Open, payload: id })
    }

    const globalState: ModalxGlobal = {
        closeModal,
        openModal,
    }

    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true
    }, [])

    return <ModalxContext.Provider value={globalState}>
        { isMounted ? createPortal(
            modalsState.currentModalId ? <div className="overlay">
                { modalsState.modals[modalsState.currentModalId]({ close: () => closeModal(), open: () => openModal(modalsState.currentModalId!) }) }
            </div> : null,
            document.body
        ) : null }
        { children }
    </ModalxContext.Provider>
}