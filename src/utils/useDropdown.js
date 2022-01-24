import { useState, useEffect } from "react";

function useDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {
        const hideMenu = () => {
            if (window.innerWidth > 720 && isOpen) {
                setIsOpen(false)
                console.log(window.innerWidth)
            }
            console.log(window.innerWidth)
        }
        window.addEventListener('resize', hideMenu)

        return () => {
            window.removeEventListener('resize', hideMenu)
        }
    })

    return [isOpen, toggle];
}

export default useDropdown
