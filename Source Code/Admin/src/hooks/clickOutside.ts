import { RefObject, useEffect } from "react";

/**
 * A hook that executes a callback function when a mouse click occurs outside of the target element.
 * @param nodeRef React Ref of a node which is the target element.
 * @param callback The function that is to be executed upon clicking outside.
 * @param clickNodeRef React Ref of an element which contains the target and shouldn't fire the click outside function
 */
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


/**
 * recursively check if a given attribute is attached to DOM nodes
 * @param target 
 * @param attribute 
 * @returns true or false
 */
function hasDataAttribute(target: HTMLElement, attribute: string): boolean {
    if (!target || target === document.documentElement) {
      return false;
    }
  
    if (target.hasAttribute(attribute)) {
      return true;
    }
  
    return hasDataAttribute(target.parentNode as HTMLElement, attribute);
  }