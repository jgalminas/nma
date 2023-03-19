import { useEffect } from "react";
import { Ref } from '../../types/admin.types';

// Click outside hook that works with a toggle button.
// Takes three params, a node ref for the click element, a ref for the menu node
// and the callback function.
// If not toggle is not being used pass null to the clickNodeRef.
export default function useClickOutside(menuNodeRef: Ref, callback: () => void, clickNodeRef?: Ref) {

    useEffect(() => {
        
        function handleClick(e: MouseEvent) {
       
            const target = e.composedPath()[0] as Node;
            
            if (clickNodeRef?.current?.contains(target)) {
                return;
            } else if (!menuNodeRef.current?.contains(target)) {
                callback();                
            }
        }
        
        document.addEventListener("mousedown", handleClick);
        return () => {
        document.removeEventListener("mousedown", handleClick);
    }

    }, [])
}