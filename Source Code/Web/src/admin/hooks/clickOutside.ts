import { RefObject, useEffect } from "react";

// Click outside hook that works with a toggle button.
// Takes three params, a node ref for the click element, a ref for the menu node
// and the callback function.
// If not toggle is not being used pass null to the clickNodeRef.
export default function useClickOutside<T extends HTMLElement>(nodeRef: RefObject<T>, callback: () => void, clickNodeRef?: RefObject<T>) {

    useEffect(() => {
        
        function handleClick(e: MouseEvent) {
       
            const target = e.target as HTMLElement;            

            if (clickNodeRef?.current?.contains(target) || target.getAttribute('data-ignored') || hasDataAttribute(target, 'data-ignored')) {
                return;
            } else if (!nodeRef.current?.contains(target)) {
                
                callback();                
            }
        }
        
        document.addEventListener("mousedown", handleClick);
        return () => {
        document.removeEventListener("mousedown", handleClick);
    }

    }, [])
}


// recursively check if a given attribute is attached to DOM nodes
function hasDataAttribute(target: HTMLElement, attribute: string): boolean {
    if (!target || target === document.documentElement) {
      return false;
    }
  
    if (target.hasAttribute(attribute)) {
      return true;
    }
  
    return hasDataAttribute(target.parentNode as HTMLElement, attribute);
  }