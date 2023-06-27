import cn from "@/utils/cn";
import { type HTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { createPortal } from "react-dom";

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
    options: { name: string, icon: string }[],
    onOptionChange: (selection: string) => void
}

export const Dropdown = ({ onOptionChange, options, className, ...props }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentOption, setCurrentOption] = useState(options[0].name)

    const optionBoxRef = useRef<HTMLDivElement | null>(null)
    const bodyRef = useRef<HTMLDivElement | null>(null)

    const openDropdown = () => {
        if (!optionBoxRef.current || !bodyRef.current || isOpen) return
        setIsOpen(true)
        const rect = bodyRef.current.getBoundingClientRect()
        optionBoxRef.current.style.top = rect.top + bodyRef.current.clientHeight + 10 + 'px'
        optionBoxRef.current.style.left = rect.left + 'px'
    }

    const optionClickHandler = (idx: number) => {
        setIsOpen(false)
        setCurrentOption(options[idx].name)
        onOptionChange(options[idx].name)
    }

    const closeDropdown = () => setIsOpen(false)

    const keyUpHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') closeDropdown()
    }, [])

    const clickHandler = useCallback((e: MouseEvent) => {
        if (optionBoxRef.current && e.target && !optionBoxRef.current.contains(e.target as Node)) closeDropdown()
    }, [])

    useEffect(() => {
        window.addEventListener('keyup', keyUpHandler)
        window.addEventListener('mousedown', clickHandler)

        return () => {
            window.removeEventListener('keyup', keyUpHandler)
            window.removeEventListener('mousedown', clickHandler)
        }
    }, [clickHandler, keyUpHandler])

    return <>
        <div onClick={openDropdown} ref={bodyRef} className={cn('pl-3 pr-2 py-1 rounded-full border inline-flex items-center gap-2 text-sm cursor-pointer font-medium transition-colors', isOpen ? 'border-blue-500' : 'border-neutral-800', className)} {...props}>
            { currentOption }
            <Icon className="text-2xl font-light h-6 flex items-center translate-y-[1px]">expand_more</Icon>
        </div>
        { createPortal(<div className={`absolute ${isOpen ? 'flex' : 'hidden'} flex-col rounded-xl border bg-black border-neutral-800 min-w-[200px] z-40 overflow-hidden`} ref={optionBoxRef}>
            { options.map((option, idx) => <button className="hover:bg-white/10 w-full text-left px-2.5 py-2 flex items-center gap-3 transition-colors text-sm font-medium" key={idx} onClick={() => optionClickHandler(idx)}>
                <Icon className="text-gray-300 scale-[1.3]">{ option.icon }</Icon>
                { option.name }
            </button>) }
        </div>, document.body) }
    </>
}